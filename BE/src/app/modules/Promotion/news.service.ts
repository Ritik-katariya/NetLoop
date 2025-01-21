import { News } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create News
const createNews = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const files = req.files as any;
      const { exploreId, title, content, expireAt, ...otherData } = req.body;

      if (!title || !content) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Title and content are required");
      }

      // Validate if Explore exists
      if (exploreId) {
        const exploreExists = await tx.explore.findUnique({
          where: { id: exploreId },
        });
        if (!exploreExists) {
          throw new ApiError(httpStatus.NOT_FOUND, "Explore not found");
        }
      }

      // Handle image uploads
      let imageUrls: string[] = [];
      if (files?.images) {
        const uploadPromises = files.images.map((file: any) =>
          CloudinaryHelper.uploadFile(file)
        );
        const uploadResults = await Promise.all(uploadPromises);
        imageUrls = uploadResults.map((upload) => upload.secure_url);
      }
       
      // Create news
      const news: News | null = await tx.news.create({
        data: {
          title,
          content,
          image: imageUrls,
          exploreId,
          expireAt: new Date(expireAt),
          ...otherData,
        },
      });

      return news;
    },
    { timeout: 500000 } // 10 seconds timeout for the transaction
  );

  return data;
};

// Get a single News by ID
const getNews = async (id: string): Promise<News | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.news.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "News not found");
  }

  return result;
};

// Get all News
const getAllNews = async (): Promise<News[]> => {
  const result = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

// Update News
const updateNews = async (req: Request): Promise<News> => {
  const files = req.files as any;
  const id = req.params.id as string;
  const { title, content, category, expireAt, ...otherData } = req.body;

  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  // Handle image uploads
  let imageUrls: string[] = [];
  if (files?.images) {
    const uploadPromises = files.images.map((file: any) =>
      CloudinaryHelper.uploadFile(file)
    );
    const uploadResults = await Promise.all(uploadPromises);
    imageUrls = uploadResults.map((upload) => upload.secure_url);
    otherData.image = imageUrls;
  }

  const result = await prisma.news.update({
    where: { id },
    data: {
      title,
      content,
      category,
      expireAt: expireAt ? new Date(expireAt) : undefined,
      ...otherData,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "News not found");
  }

  return result;
};

// Delete News
const deleteNews = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    try {
      const news = await tx.news.delete({
        where: { id },
      });
      return news;
    } catch (error) {
      throw new Error(`News delete failed: ${(error as Error).message}`);
    }
  });

  return result;
};

// Get News by Explore ID
const getNewsByExplore = async (exploreId: string): Promise<News[]> => {
  if (!exploreId) throw new ApiError(httpStatus.BAD_REQUEST, "Explore ID is required");

  try {
    const result = await prisma.news.findMany({
      where: { exploreId },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    throw new Error(`Get News by Explore failed: ${(error as Error).message}`);
  }
};

// Export News Service
export const newsService = {
  createNews,
  getNews,
  getAllNews,
  updateNews,
  deleteNews,
  getNewsByExplore,
};

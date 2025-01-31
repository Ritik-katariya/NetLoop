import { Promotion } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create Promotion
const createPromotion = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { text, textColor, link, backgroundColor, exploreId,  memberId, ...otherData } = req.body;

      if (!text || !textColor || !link || !backgroundColor || !memberId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Required fields are missing");
      }

      // Validate if Explore exists (if exploreId is provided)
      if (exploreId) {
        const exploreExists = await tx.explore.findUnique({
          where: { id: exploreId },
        });
        if (!exploreExists) {
          throw new ApiError(httpStatus.NOT_FOUND, "Explore not found");
        }
      }
      const expireAt = new Date();
      expireAt.setHours(expireAt.getHours() + 24);
      // Create promotion
      const promotion: Promotion | null = await tx.promotion.create({
        data: {
          text,
          textColor,
          link,
          backgroundColor,
          exploreId,
          memberId,
          expireAt,
          ...otherData,
        },
      });

      return promotion;
    },
    { timeout: 500000 } // 10 seconds timeout for the transaction
  );

  return data;
};

// Get a single Promotion by ID
const getPromotion = async (id: string): Promise<Promotion | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.promotion.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Promotion not found");
  }

  return result;
};

// Get all Promotions
const getAllPromotions = async (): Promise<Promotion[]> => {
  const result = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

// Update Promotion
const updatePromotion = async (req: Request): Promise<Promotion> => {
  const id = req.params.id as string;
  const { text, textColor, link, backgroundColor, expireAt, ...otherData } = req.body;

  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.promotion.update({
    where: { id },
    data: {
      text,
      textColor,
      link,
      backgroundColor,
      expireAt: expireAt ? new Date(expireAt) : undefined,
      ...otherData,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Promotion not found");
  }

  return result;
};

// Delete Promotion
const deletePromotion = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    try {
      const promotion = await tx.promotion.delete({
        where: { id },
      });
      return promotion;
    } catch (error) {
      throw new Error(`Promotion delete failed: ${(error as Error).message}`);
    }
  });

  return result;
};

// Get Promotions by Explore ID
const getPromotionsByExplore = async (exploreId: string): Promise<Promotion[]> => {
  if (!exploreId) throw new ApiError(httpStatus.BAD_REQUEST, "Explore ID is required");

  try {
    const result = await prisma.promotion.findMany({
      where: { exploreId },
      orderBy: { createdAt: "desc" },
      include: { member: {include:{profile:{select:{img:true}},
      networks:{select:{name:true}},
      verified:{select:{verified:true}},
    }} },
    });
    return result;
  } catch (error) {
    throw new Error(`Get Promotions by Explore failed: ${(error as Error).message}`);
  }
};

// Export Promotion Service
export const promotionService = {
  createPromotion,
  getPromotion,
  getAllPromotions,
  updatePromotion,
  deletePromotion,
  getPromotionsByExplore,
};

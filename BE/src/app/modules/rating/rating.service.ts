import { Rating, Category, Members, Explore } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { disconnect } from "process";

// Create Rating
const createRating = async (req: Request): Promise<Rating> => {
  const { title, description, memberId, exploreId, ...otherData } = req.body;
  const file = req.file as any;

  if (!title || !description) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Title and description are required");
  }

  let imageUrls: string | null = null;
  if (file) {
    const img = await CloudinaryHelper.uploadFile(file);
    imageUrls = img.secure_url;
  }

  const expireAt = new Date();
  expireAt.setHours(expireAt.getHours() + 24);

  try {
    const rating = await prisma.rating.create({
      data: {
        title,
        description,
        image: imageUrls,
        memberId,
        exploreId,
        totalrating: 0,
        rating: [0, 0, 0, 0, 0],
        expireAt,
        ...otherData, // Spread other fields from request body
      },
    });

    
    return rating;
  } catch (error) {
    console.error("Error creating rating:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Rating creation failed");
  }
};


// Get a single Rating by ID
const getRating = async (id: string): Promise<Rating | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.rating.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Rating not found");
  }

  return result;
};

// Get all Ratings
const getAllRatings = async (): Promise<Rating[]> => {
  const result = await prisma.rating.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      member: true,
      explore: true,
    },
  });

  return result;
};

// Update Rating
const updateRating = async (req: Request): Promise<Rating> => {
  const id = req.params.id as string;
  const { title, description, category, memberId, exploreId, totalrating, rating, ...otherData } = req.body;
  const files = req.files as any;

  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  let imageUrls: string | null = null;
  if (files?.image) {
    const upload = await CloudinaryHelper.uploadFile(files.image);
    imageUrls = upload.secure_url;
  }

  const updatedRating = await prisma.rating.update({
    where: { id },
    data: {
      title,
      description,
      category: category ? { connect: { name: category } } : undefined,
      member: memberId ? { connect: { id: memberId } } : undefined,
      explore: exploreId ? { connect: { id: exploreId } } : undefined,
      totalrating: totalrating ?? 0,
      rating: rating ?? [0, 0, 0, 0, 0],
      image: imageUrls ?? undefined,
      ...otherData,
    },
  });

  if (!updatedRating) {
    throw new ApiError(httpStatus.NOT_FOUND, "Rating not found");
  }

  return updatedRating;
};

// Delete Rating
const deleteRating = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  try {
    const deletedRating = await prisma.rating.delete({
      where: { id },
    });
    return deletedRating;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Rating delete failed");
  }
};

// Get Ratings by Explore ID
const getRatingsByExplore = async (exploreId: string): Promise<Rating[]> => {
  if (!exploreId) throw new ApiError(httpStatus.BAD_REQUEST, "Explore ID is required");

  const result = await prisma.rating.findMany({
    where: { exploreId },
    orderBy: { createdAt: "desc" },
    include: { member: {include:{profile:{select:{img:true}},
    networks:{select:{name:true}},
    verified:{select:{verified:true}},
  }} },
  });

  return result;
};

// Submit a Rating
const submitRating = async (id: string, memberId: string, ratingValue: number): Promise<Rating> => {
  if (!id || !memberId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "ID and Member ID are required");
  }

  if (ratingValue < 1 || ratingValue > 5) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid rating value");
  }

  const rating = await prisma.rating.findUnique({
    where: { id },
    include: { voter: true },
  });

  if (!rating) {
    throw new ApiError(httpStatus.NOT_FOUND, "Rating not found");
  }

  const hasRated = rating.voter.some((voter) => voter.id === memberId);
  if (hasRated) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Member has already rated this item");
  }

  rating.rating[ratingValue - 1] += 1;

  const updatedRating = await prisma.rating.update({
    where: { id },
    data: {
      rating: rating.rating,
      totalrating: rating.totalrating + 1,
      voter: { connect: { id: memberId } },
    },
  });

  return updatedRating;
};

// Export Rating Service
export const ratingService = {
  createRating,
  getRating,
  getAllRatings,
  updateRating,
  deleteRating,
  getRatingsByExplore,
  submitRating,
};

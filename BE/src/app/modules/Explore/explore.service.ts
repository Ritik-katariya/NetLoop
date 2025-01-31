import { Explore } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";

// Create Explore
const createExplore = async (req: Request): Promise<Explore> => {
  const { networkId, ...otherData } = req.body;

  // Check if network exists
  const networkExists = await prisma.network.findFirst({
    where: { id: networkId },
  });
  if (!networkExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Network not found");
  }

  // Create Explore entry
  try {
    const explore = await prisma.explore.create({
      data: {
        ...otherData,
        networkId,
      },
    });
    return explore;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create Explore");
  }
};

// Get Explore by ID
const getExplore = async (id: string): Promise<Explore | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const explore = await prisma.explore.findUnique({
    where: { id },
    include: {
      news: true,
      events: true,
      poll: true,
      rating:true,
      promotion: true,
      likes: true,
      comments: true,
      share: true,
    },
  });

  if (!explore) {
    throw new ApiError(httpStatus.NOT_FOUND, "Explore not found");
  }

  return explore;
};

// Get all Explores
const getAllExplores = async (): Promise<Explore[]> => {
  const explores = await prisma.explore.findMany({
    include: {
      news: true,
      events: true,
      poll: true,
      rating: true,
      promotion: true,
      likes: true,
      comments: true,
      share: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return explores;
};

// Update Explore
const updateExplore = async (req: Request): Promise<Explore> => {
  const id = req.params.id as string;
  const { ...otherData } = req.body;

  const explore = await prisma.explore.update({
    where: { id },
    data: otherData,
  });

  if (!explore) {
    throw new ApiError(httpStatus.NOT_FOUND, "Explore not found");
  }

  return explore;
};

// Delete Explore
const deleteExplore = async (id: string): Promise<Explore> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const explore = await prisma.explore.delete({
    where: { id },
  });

  return explore;
};

export const exploreService = {
  createExplore,
  getExplore,
  getAllExplores,
  updateExplore,
  deleteExplore,
};

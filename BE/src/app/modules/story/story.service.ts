import { Story } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create a Story
const createStory = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const file = req.file as Express.Multer.File | undefined; // Ensure correct type
    const { memberId, networkId,...otherData } = req.body;

    // Validate if memberId exists in the Members table
    const memberExists = await tx.members.findUnique({
      where: { id: memberId },
    });
    if (!memberExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }

    // Validate if networkId exists in the Networks table (if provided)
    if (networkId) {
      const networkExists = await tx.network.findUnique({
        where: { id: networkId },
      });
      if (!networkExists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Network not found");
      }
    }

    // Initialize image & video fields as null
    let imageUrl: string | null = null;
    let videoUrl: string | null = null;

    // Handle file uploads
    if (file) {
      const uploadResult = await CloudinaryHelper.uploadFile(file);
      if (!uploadResult || !uploadResult.secure_url) {
        throw new ApiError(
          httpStatus.EXPECTATION_FAILED,
          "Failed to upload file"
        );
      }

      if (file.mimetype.startsWith("image/")) {
        imageUrl = uploadResult.secure_url;
      } else if (file.mimetype.startsWith("video/")) {
        videoUrl = uploadResult.secure_url;
      }
    }

    // Create story
    try {
      const story: Story | null = await tx.story.create({
        data: {
          ...otherData,
          image: imageUrl, // ✅ Now a string or null
          video: videoUrl, // ✅ Now a string or null
          memberId,
          networkId: networkId || null
        },
      });
      return story;
    } catch (error) {
      console.error(error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create story"
      );
    }
  }, { timeout: 500000 });

  return data;
};

// Get a single Story by ID
const getStory = async (id: string): Promise<Story | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.story.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Story not found");
  }

  return result;
};

// Get all Stories
const getStories = async (): Promise<Story[]> => {
  const result = await prisma.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

// Update a Story
const updateStory = async (req: Request): Promise<Story> => {
  const files = req.files as { image?: any; video?: any };
  const id = req.params.id as string;
  const { ...otherData } = req.body;

  // Handle image upload
  if (files?.image) {
    const uploadImage = await CloudinaryHelper.uploadFile(files.image[0]);
    if (uploadImage) {
      otherData.image = uploadImage.secure_url;
    } else {
      throw new ApiError(
        httpStatus.EXPECTATION_FAILED,
        "Failed to upload image"
      );
    }
  }

  // Handle video upload
  if (files?.video) {
    const uploadVideo = await CloudinaryHelper.uploadFile(files.video[0]);
    if (uploadVideo) {
      otherData.video = uploadVideo.secure_url;
    } else {
      throw new ApiError(
        httpStatus.EXPECTATION_FAILED,
        "Failed to upload video"
      );
    }
  }

  const result = await prisma.story.update({
    where: { id },
    data: otherData,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Story not found");
  }

  return result;
};

// Delete a Story
const deleteStory = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    try {
      const story = await tx.story.delete({
        where: { id },
      });
      return story;
    } catch (error) {
      throw new Error(`Story delete failed: ${(error as Error).message}`);
    }
  });

  return result;
};

const getStoryByMember = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");
  try {
    const result = await prisma.story.findMany({
      where: { memberId: id },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    throw new Error(`Get Story by Member failed: ${(error as Error).message}`);
  }
};

export const storyService = {
  createStory,
  updateStory,
  getStory,
  deleteStory,
  getStories,
  getStoryByMember,
};

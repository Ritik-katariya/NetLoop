import { Story, MediaType } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create a Story
const createStory = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const file = req.file as Express.Multer.File | undefined;
      const { memberId, networkId, ...otherData } = req.body;

      // Validate member existence
      const memberExists = await tx.members.findUnique({
        where: { id: memberId },
      });
      if (!memberExists)
        throw new ApiError(httpStatus.NOT_FOUND, "Member not found");

      // Validate network existence (if provided)
      if (networkId) {
        const networkExists = await tx.network.findUnique({
          where: { id: networkId },
        });
        if (!networkExists)
          throw new ApiError(httpStatus.NOT_FOUND, "Network not found");
      }

      let imageUrl: string | null = null;
      let videoUrl: string | null = null;
      let hlsUrl: string | null = null;
      let thumbnailUrl: string | null = null;
      let duration: number | null = null;
      let mediaType: MediaType | null = null;

      // Handle file upload
      if (file) {
        if (file.mimetype.startsWith("image/")) {
          // ✅ Optimize Image Compression
          const uploadResult = await CloudinaryHelper.uploadImage(file);

          if (!uploadResult || !uploadResult.secure_url) {
            throw new ApiError(
              httpStatus.EXPECTATION_FAILED,
              "Failed to upload image"
            );
          }

          imageUrl = uploadResult.secure_url;
          mediaType = MediaType.IMAGE;
        } else if (file.mimetype.startsWith("video/")) {
          // ✅ Validate Video Length (Max 15s)
          const metadata = await CloudinaryHelper.getVideoMetadata(file);
          if (metadata.duration > 15) {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              "Video must be 15 seconds or less"
            );
          }

          // ✅ Upload and Convert to HLS (.m3u8)
          const uploadResult = await CloudinaryHelper.uploadVideo(file);

          if (!uploadResult || !uploadResult.secure_url) {
            throw new ApiError(
              httpStatus.EXPECTATION_FAILED,
              "Failed to upload video"
            );
          }

          videoUrl = uploadResult.secure_url;
          hlsUrl = (uploadResult as any).hls_url || null; // Store HLS URL for adaptive streaming
          thumbnailUrl = (uploadResult as any).thumbnail_url || null; // Extract video thumbnail
          duration = metadata.duration;
          mediaType = MediaType.VIDEO;
        }
      }

      // ✅ Create Story Record in DB
      try {
        const story = await tx.story.create({
          data: {
            ...otherData,
            mediaUrl: imageUrl || videoUrl, // Store media URL
            mediaType,
            duration,
            hlsUrl, // Store HLS URL for videos
            thumbnail: thumbnailUrl, // Store thumbnail for videos
            memberId,
            networkId: networkId || null,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiration to 24 hours from now
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
    },
    { timeout: 500000 }
  );

  return data;
};

const getStories = async (req: Request, res: Response): Promise<void> => {
  const { cursor, limit = 10 } = req.query;

  const stories = await prisma.story.findMany({
    take: Number(limit),
    skip: cursor ? 1 : 0, // Skip the first item if cursor exists
    cursor: cursor ? { id: cursor as string } : undefined,
    orderBy: { createdAt: "desc" },
  });

  res.json({
    data: stories,
    nextCursor: stories.length ? stories[stories.length - 1].id : null,
  });
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

// // Get all Stories
// const getStories = async (): Promise<Story[]> => {
//   const result = await prisma.story.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return result;
// };

// Update a Story
const updateStory = async (req: Request): Promise<Story> => {
  const files = req.files as { image?: any; video?: any };
  const id = req.params.id as string;
  const { ...otherData } = req.body;

  // Handle image upload
  if (files?.image) {
    const uploadImage = await CloudinaryHelper.uploadImage(files.image[0]);
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
    const uploadVideo = await CloudinaryHelper.uploadVideo(files.video[0]);
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

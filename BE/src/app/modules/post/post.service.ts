import { Post } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create a Post
const createPost = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const files = req.file as any;
      const { memberId, networkId, clusterId, ...otherData } = req.body;

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

      // Validate if clusterId exists in the Clusters table (if provided)
      if (clusterId) {
        const clusterExists = await tx.cluster.findUnique({
          where: { id: clusterId },
        });
        if (!clusterExists) {
          throw new ApiError(httpStatus.NOT_FOUND, "Cluster not found");
        }
      }

      // Handle file uploads
      if (files) {
        if (files.mimetype.startsWith("image/")) {
          const uploadImage = await CloudinaryHelper.uploadFile(files);
          if (uploadImage) {
            otherData.image = uploadImage.secure_url;
          } else {
            throw new ApiError(
              httpStatus.EXPECTATION_FAILED,
              "Failed to upload image"
            );
          }
        } else if (files.mimetype.startsWith("video/")) {
          const uploadVideo = await CloudinaryHelper.uploadFile(files);
          if (uploadVideo) {
            otherData.video = uploadVideo.secure_url;
          } else {
            throw new ApiError(
              httpStatus.EXPECTATION_FAILED,
              "Failed to upload video"
            );
          }
        }
      }

      // Create post
      try {
        const post: Post | null = await tx.post.create({
          data: {
            ...otherData,
            memberId,
            networkId: networkId || null, // Set to null if not provided
            clusterId: clusterId || null, // Set to null if not provided
          },
        });
        return post;
      } catch (error) {
        console.error(error);
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to create post"
        );
      }
    },
    {
      timeout: 500000, // 10 seconds timeout for the transaction
    }
  );

  return data;
};


// Get a single Post by ID
const getPost = async (id: string): Promise<Post | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.post.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }

  return result;
};

// Get all Posts
const getPosts = async (): Promise<Post[]> => {
  const result = await prisma.post.findMany({
    where: { networkId: null },
    orderBy: {
      createdAt: "desc", // or any other field you want to order by
    },
  });
  return result;
};

// Update a Post
const updatePost = async (req: Request): Promise<Post> => {
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

  const result = await prisma.post.update({
    where: { id },
    data: otherData,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }

  return result;
};

// Delete a Post
const deletePost = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    try {
      const post = await tx.post.delete({
        where: { id },
      });
      return post;
    } catch (error) {
      throw new Error(`Post delete failed: ${(error as Error).message}`);
    }
  });

  return result;
};

const getPostbyMember = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");
  try {
    const result = await prisma.post.findMany({
      where: { memberId: id },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    throw new Error(`get Post by Member failed: ${(error as Error).message}`);
  }
};

export const postService = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPosts,
  getPostbyMember,
};

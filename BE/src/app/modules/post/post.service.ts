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
      const { memberId,networkId,clusterId, ...otherData } = req.body;

      // Validate if memberId exists in the Members table
      const memberExists = await tx.members.findUnique({
        where: { id: memberId },
      });
      if (!memberExists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
      }

    if (files) {
      if ( files.mimetype.startsWith("image/")) {
        // Handle image upload
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
        // Handle video upload
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

      // Handle video upload
      

      // Create post
      try {
        const post: Post | null = await tx.post.create({ data: { ...otherData, memberId } });
        return post;
      } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
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
  const result = await prisma.post.findMany();
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
    const post = await tx.post.delete({
      where: { id },
    });
    return post;
  });

  return result;
};

export const postService = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPosts,
};

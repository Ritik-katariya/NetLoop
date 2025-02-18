import { Post } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create a Post
const createPost = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const file = req.file as Express.Multer.File | undefined;
      const { memberId, networkId, clusterId, ...otherData } = req.body;

      // Validate if member exists
      const memberExists = await tx.members.findUnique({ where: { id: memberId } });
      if (!memberExists) throw new ApiError(httpStatus.NOT_FOUND, "Member not found");

      // Validate if network exists
      if (networkId) {
        const networkExists = await tx.network.findUnique({ where: { id: networkId } });
        if (!networkExists) throw new ApiError(httpStatus.NOT_FOUND, "Network not found");
      }

      // Validate if cluster exists
      if (clusterId) {
        const clusterExists = await tx.cluster.findUnique({ where: { id: clusterId } });
        if (!clusterExists) throw new ApiError(httpStatus.NOT_FOUND, "Cluster not found");
      }

      let imageUrl: string | null = null;
      let videoUrl: string | null = null;
      let hlsUrl: string | null = null;
      let thumbnailUrl: string | null = null;

      // Handle file upload
      if (file) {
        if (file.mimetype.startsWith("image/")) {
          const uploadResult = await CloudinaryHelper.uploadImage(file);
          if (!uploadResult?.secure_url) {
            throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload image");
          }
          imageUrl = uploadResult.secure_url;
        } else if (file.mimetype.startsWith("video/")) {
          const uploadResult = await CloudinaryHelper.uploadVideo(file);
          if (!uploadResult?.secure_url) {
            throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload video");
          }
          videoUrl = uploadResult.secure_url;
          hlsUrl = (uploadResult as any).hls_url || null;
          thumbnailUrl = (uploadResult as any).thumbnail_url || null;
        }
      }

      // Create post
      try {
        const post = await tx.post.create({
          data: {
            ...otherData,
            image: imageUrl,
            video: videoUrl,
            hlsUrl,
            thumbnail: thumbnailUrl,
            memberId,
            networkId: networkId || null,
            clusterId: clusterId || null,
          },
        });
        return post;
      } catch (error) {
        console.error(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
      }
    },
    { timeout: 500000 }
  );

  return data;
};

// Get a single Post by ID
const getPost = async (id: string): Promise<Post | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.post.findUnique({ where: { id } });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Post not found");

  return result;
};

// Get all Posts
const getPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include:{
      likes:{select:{memberId:true}}
    }
  });
};

const getHomePagePosts = async (networkId?: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { networkId: null }, // Always fetch posts with no network
          ...(networkId ? [{ networkId }] : []), // If networkId exists, also fetch posts with that networkId
        ],
      },
      include: {
        likes: true, // Include likes to count them
        member: true, // Include member details
      },
    });
    

    // Sort posts based on the criteria
    const sortedPosts = posts.sort((a, b) => {
      const likesDiff = (b.likes?.length || 0) - (a.likes?.length || 0); // More liked first
      const dateDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Latest first
      const randomFactor = Math.random() - 0.5; // Introduce randomness

      const factors = [likesDiff, dateDiff, randomFactor];
const selectedFactor = factors[Math.floor(Math.random() * factors.length)];
return selectedFactor;

    });

    return sortedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};



// Get only Video Posts
const getVideoPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    where: { video: { not: null } },
    orderBy: { createdAt: "desc" },
  });
};

// Update a Post
const updatePost = async (req: Request): Promise<Post> => {
  const file = req.file as Express.Multer.File | undefined;
  const id = req.params.id as string;
  const { ...otherData } = req.body;

  let imageUrl: string | null = null;
  let videoUrl: string | null = null;
  let hlsUrl: string | null = null;
  let thumbnailUrl: string | null = null;

  // Handle file upload
  if (file) {
    if (file.mimetype.startsWith("image/")) {
      const uploadResult = await CloudinaryHelper.uploadImage(file);
      if (uploadResult) imageUrl = uploadResult.secure_url;
    } else if (file.mimetype.startsWith("video/")) {
      const uploadResult = await CloudinaryHelper.uploadVideo(file);
      if (uploadResult) {
        videoUrl = uploadResult.secure_url;
        hlsUrl = (uploadResult as any).hls_url || null;
        thumbnailUrl = (uploadResult as any).thumbnail_url || null;
      }
    }
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      ...otherData,
      image: imageUrl || otherData.image,
      video: videoUrl || otherData.video,
      hlsUrl,
      thumbnail: thumbnailUrl,
    },
  });

  if (!updatedPost) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }

  return updatedPost;
};

// Delete a Post
const deletePost = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    try {
      return await tx.post.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Post delete failed: ${(error as Error).message}`);
    }
  });

  return result;
};

// Get Posts by Member ID
const getPostbyMember = async (id: string): Promise<Post[]> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  return prisma.post.findMany({
    where: { memberId: id },
    orderBy: { createdAt: "desc" },
    include:{
      likes:{select:{memberId:true}}
    }
  });
};

export const postService = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPosts,
  getVideoPosts, // ✅ Fetch only video posts
  getPostbyMember,
  getHomePagePosts
};

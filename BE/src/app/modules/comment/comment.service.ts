import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import { Request } from "express";
import httpStatus from "http-status";

const createComment = async (req: Request) => {
  const { memberId, content, parentId, postId } = req.body;

  const member = await prisma.members.findUnique({ where: { id: memberId } });
  if (!member) throw new ApiError(httpStatus.NOT_FOUND, "Member not found");

  if (!postId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Post ID is required");
  }

  try {
    const comment = await prisma.comments.create({
      data: {
        content,
        member: { connect: { id: memberId } },
        post: { connect: { id: postId } },
        parent: parentId ? { connect: { id: parentId } } : undefined
      },
      include: {
        member: {
          select: { 
            id: true, 
            name: true, 
            profile: { select: { img: true } } 
          }
        },
        replies: {
          include: {
            member: {
              select: { 
                id: true, 
                name: true, 
                profile: { select: { img: true } } 
              }
            },
            likes: true
          }
        },
        likes: true
      }
    });

    return comment;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment creation failed");
  }
};

const getComments = async (postId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  try {
    const comments = await prisma.comments.findMany({
      where: { 
        postId,
        parentId: null // Only get root comments
      },
      include: {
        member: {
          select: { 
            id: true, 
            name: true, 
            profile: { select: { img: true } } 
          }
        },
        likes: true,
        replies: {
          include: {
            member: {
              select: { 
                id: true, 
                name: true, 
                profile: { select: { img: true } } 
              }
            },
            likes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.comments.count({ 
      where: { postId, parentId: null }
    });

    return {
      comments,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + limit < total
      }
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch comments");
  }
};

const getReplies = async (commentId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  try {
    const replies = await prisma.comments.findMany({
      where: { parentId: commentId },
      include: {
        member: {
          select: { 
            id: true, 
            name: true, 
            profile: { select: { img: true } } 
          }
        },
        likes: true
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.comments.count({ 
      where: { parentId: commentId }
    });

    return {
      replies,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + limit < total
      }
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch replies");
  }
};

const updateComment = async (req: Request) => {
  const { content } = req.body;
  const commentId = req.params.id;
  const memberId = req.body.memberId;

  const comment = await prisma.comments.findUnique({ where: { id: commentId } });
  if (!comment) throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  if (comment.memberId !== memberId) throw new ApiError(httpStatus.FORBIDDEN, "Not authorized");

  try {
    const updatedComment = await prisma.comments.update({
      where: { id: commentId },
      data: { content }
    });
    return updatedComment;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment update failed");
  }
};

const deleteComment = async (req: Request) => {
  const commentId = req.params.id;
  const memberId = req.body.memberId;

  const comment = await prisma.comments.findUnique({ where: { id: commentId } });
  if (!comment) throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  if (comment.memberId !== memberId) throw new ApiError(httpStatus.FORBIDDEN, "Not authorized");

  try {
    await prisma.comments.delete({ where: { id: commentId } });
    return { message: "Comment deleted successfully" };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment deletion failed");
  }
};

export const commentService = {
  createComment,
  getComments,
  getReplies,
  updateComment,
  deleteComment
};

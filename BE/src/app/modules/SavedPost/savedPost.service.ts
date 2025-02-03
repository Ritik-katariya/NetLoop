import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import { Request } from "express";
import httpStatus from "http-status";

const toggleSave = async (
  memberId: string,
  targetType: 'post' | 'network' | 'cluster',
  targetId: string
) => {
  const memberExists = await prisma.members.findUnique({ where: { id: memberId } });
  if (!memberExists) throw new ApiError(httpStatus.NOT_FOUND, "Member not found");

  const data: any = { memberId };
  
  switch (targetType) {
    case 'post':
      data.postId = targetId;
      break;
    case 'network':
      data.networkId = targetId;
      break;
    case 'cluster':
      data.clusterId = targetId;
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid target type");
  }

  try {
    const existingSave = await prisma.savedPost.findFirst({
      where: data
    });

    if (existingSave) {
      await prisma.savedPost.delete({
        where: { id: existingSave.id }
      });
      return { message: "Item unsaved successfully" };
    } else {
      const savedPost = await prisma.savedPost.create({
        data,
        include: {
          post: true,
          network: true,
          cluster: true
        }
      });
      return { message: "Item saved successfully", data: savedPost };
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Save operation failed");
  }
};

const getSavedItems = async (memberId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  try {
    const savedItems = await prisma.savedPost.findMany({
      where: { memberId },
      include: {
        post: {
          include: {
            member: {
              select: {
                id: true,
                name: true,
                profile: { select: { img: true } }
              }
            }
          }
        },
        network: {
          select: {
            id: true,
            name: true,
            logo: true,
            about: true
          }
        },
        cluster: {
          select: {
            id: true,
            name: true,
            logo: true,
            about: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.savedPost.count({ where: { memberId } });

    return {
      savedItems,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + limit < total
      }
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch saved items");
  }
};

const checkSaveStatus = async (
  memberId: string,
  targetType: 'post' | 'network' | 'cluster',
  targetId: string
) => {
  const where: any = { memberId };
  
  switch (targetType) {
    case 'post':
      where.postId = targetId;
      break;
    case 'network':
      where.networkId = targetId;
      break;
    case 'cluster':
      where.clusterId = targetId;
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid target type");
  }

  const savedItem = await prisma.savedPost.findFirst({ where });
  return { isSaved: !!savedItem };
};

export const savedPostService = {
  toggleSave,
  getSavedItems,
  checkSaveStatus
}; 
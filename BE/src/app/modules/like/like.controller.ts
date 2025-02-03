import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { likeService } from "./like.service";

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const { memberId, targetType, targetId } = req.body.data;

  if (!memberId || !targetType || !targetId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "memberId, targetType, and targetId are required",
    });
  }

  const result = await likeService.toggleLike(memberId, targetType, targetId);

  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
    data: result.like,
  });
});

const getLikes = catchAsync(async (req: Request, res: Response) => {
  const { targetType, targetId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (!targetType || !targetId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "targetType and targetId are required",
    });
  }

  const result = await likeService.getLikes(targetType as any, targetId, page, limit);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Likes retrieved successfully",
    data: result,
  });
});

const checkLikeStatus = catchAsync(async (req: Request, res: Response) => {
  const { memberId, targetType, targetId } = req.query;

  if (!memberId || !targetType || !targetId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "memberId, targetType, and targetId are required",
    });
  }

  const result = await likeService.checkLikeStatus(
    memberId as string,
    targetType as any,
    targetId as string
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Like status retrieved successfully",
    data: result,
  });
});

export const likeController = {
  toggleLike,
  getLikes,
  checkLikeStatus,
}; 
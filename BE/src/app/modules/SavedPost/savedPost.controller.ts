import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { savedPostService } from "./savedPost.service";

const toggleSave = catchAsync(async (req: Request, res: Response) => {
  const { memberId, targetType, targetId } = req.body.data;

  if (!memberId || !targetType || !targetId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "memberId, targetType, and targetId are required",
    });
  }

  const result = await savedPostService.toggleSave(memberId, targetType, targetId);

  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
    data: result.data,
  });
});

const getSavedItems = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await savedPostService.getSavedItems(memberId, page, limit);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Saved items retrieved successfully",
    data: result,
  });
});

const checkSaveStatus = catchAsync(async (req: Request, res: Response) => {
  const { memberId, targetType, targetId } = req.query;

  if (!memberId || !targetType || !targetId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "memberId, targetType, and targetId are required",
    });
  }

  const result = await savedPostService.checkSaveStatus(
    memberId as string,
    targetType as 'post' | 'network' | 'cluster',
    targetId as string
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Save status retrieved successfully",
    data: result,
  });
});

export const savedPostController = {
  toggleSave,
  getSavedItems,
  checkSaveStatus,
}; 
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { commentService } from "./comment.service";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.createComment(req);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

const getComments = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await commentService.getComments(postId, page, limit);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

const getReplies = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await commentService.getReplies(commentId, page, limit);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Replies retrieved successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.updateComment(req);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.deleteComment(req);

  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
    data: result,
  });
});

export const commentController = {
  createComment,
  getComments,
  getReplies,
  updateComment,
  deleteComment,
}; 
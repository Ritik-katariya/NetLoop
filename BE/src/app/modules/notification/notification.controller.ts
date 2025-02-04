import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { notificationService } from "./notification.service";

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await notificationService.createNotification(req.body.data);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Notification created successfully",
    data: result,
  });
});

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const { receiverId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const result = await notificationService.getNotifications(receiverId, page, limit);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Notifications retrieved successfully",
    data: result,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const { receiverId } = req.body;

  const result = await notificationService.markAsRead(notificationId, receiverId);

  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  const { receiverId } = req.params;

  const result = await notificationService.markAllAsRead(receiverId);

  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
  });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const { receiverId } = req.body;

  const result = await notificationService.deleteNotification(notificationId, receiverId);

  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
  });
});

export const notificationController = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
}; 
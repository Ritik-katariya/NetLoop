import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { messageService } from "./message.service";
import { logger } from "../../../shared/logger";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createMessage");
  const result = await messageService.createMessage(req, res);
  sendResponse(res, {
    statusCode: 201,
    message: "Message created successfully!",
    success: true,
    data: result,
  });
});

const getMessagesBetweenUsers = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getMessagesBetweenUsers");
  const result = await messageService.getMessagesBetweenUsers(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Messages fetched successfully!",
    success: true,
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteMessage");
  const result = await messageService.deleteMessage(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Message deleted successfully!",
    success: true,
    data: result,
  });
});

const getAllMessagesForUser = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getAllMessagesForUser");
  const result = await messageService.getAllMessagesForUser(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "All messages for user fetched successfully!",
    success: true,
    data: result,
  });
});

export const messageController = {
  createMessage,
  getMessagesBetweenUsers,
  deleteMessage,
  getAllMessagesForUser,
};

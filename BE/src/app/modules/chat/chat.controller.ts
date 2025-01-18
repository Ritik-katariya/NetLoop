import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { chatService } from "./chat.service";
import { logger } from "../../../shared/logger";

const createChat = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createChat");
  const result = await chatService.createChat(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Chat created successfully!",
    success: true,
    data: result,
  });
});

const getChatById = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getChatById");
  const result = await chatService.getChatById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Chat fetched successfully!",
    success: true,
    data: result,
  });
});

const getChatsForMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getChatsForMember");
  const result = await chatService.getChatsForMember(req.params.memberId);
  sendResponse(res, {
    statusCode: 200,
    message: "Chats for member fetched successfully!",
    success: true,
    data: result,
  });
});

const addMemberToChat = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: addMemberToChat");
  const result = await chatService.addMemberToChat(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Member added to chat successfully!",
    success: true,
    data: result,
  });
});

const deleteChat = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteChat");
  const result = await chatService.deleteChat(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Chat deleted successfully!",
    success: true,
    data: result,
  });
});

export const chatController = {
  createChat,
  getChatById,
  getChatsForMember,
  addMemberToChat,
  deleteChat,
};

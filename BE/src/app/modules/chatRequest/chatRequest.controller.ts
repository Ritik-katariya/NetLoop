import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { chatRequestService } from "./chatRequest.service";
import { logger } from "../../../shared/logger";

const createChatRequest = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createChatRequest");
  const result = await chatRequestService.createChatRequest(req, res);
  sendResponse(res, {
    statusCode: 201,
    message: "ChatRequest created successfully!",
    success: true,
    data: result,
  });
});

const getChatRequestById = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getChatRequestById");
  const result = await chatRequestService.getChatRequestById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "ChatRequest fetched successfully!",
    success: true,
    data: result,
  });
});

const getChatRequestsForMember = catchAsync(
  async (req: Request, res: Response) => {
    logger.info("Inside controller: getChatRequestsForMember");
    const result = await chatRequestService.getChatRequestsForMember(
      req.params.memberId
    );
    sendResponse(res, {
      statusCode: 200,
      message: "ChatRequests fetched successfully!",
      success: true,
      data: result,
    });
  }
);

const deleteChatRequest = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteChatRequest");
  const result = await chatRequestService.deleteChatRequest(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "ChatRequest deleted successfully!",
    success: true,
    data: result,
  });
});

export const chatRequestController = {
  createChatRequest,
  getChatRequestById,
  getChatRequestsForMember,
  deleteChatRequest,
};

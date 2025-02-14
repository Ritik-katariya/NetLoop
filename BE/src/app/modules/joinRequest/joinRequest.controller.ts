import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { joinRequestService } from "./joinRequest.service";
import { logger } from "../../../shared/logger";

const createJoinRequest = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createJoinRequest");

  const result = await joinRequestService.createJoinRequest(req);
  sendResponse(res, {
    statusCode: 201,
    message: "Join request created successfully!",
    success: true,
    data: result,
  });
});

const getJoinRequestById = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getJoinRequestById");

  const result = await joinRequestService.getJoinRequestById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Join request fetched successfully!",
    success: true,
    data: result,
  });
});

const getJoinRequestsForMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getJoinRequestsForMember");

  const { memberId } = req.params;
  const result = await joinRequestService.getJoinRequestsForMember(memberId);
  sendResponse(res, {
    statusCode: 200,
    message: "Join requests for member fetched successfully!",
    success: true,
    data: result,
  });
});

const getJoinRequestsForNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getJoinRequestsForNetwork");

  const { networkId } = req.params;
  const result = await joinRequestService.getJoinRequestsForNetwork(networkId);
  sendResponse(res, {
    statusCode: 200,
    message: "Join requests for network fetched successfully!",
    success: true,
    data: result,
  });
});

const deleteJoinRequest = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteJoinRequest");

  const result = await joinRequestService.deleteJoinRequest(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Join request deleted successfully!",
    success: true,
    data: result,
  });
});

export const joinRequestController = {
  createJoinRequest,
  getJoinRequestById,
  getJoinRequestsForMember,
  getJoinRequestsForNetwork,
  deleteJoinRequest,
};

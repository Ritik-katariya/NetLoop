import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { verificationService } from "./verification.service";
import { logger } from "../../../shared/logger";

const createVerification = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createVerification");
  const result = await verificationService.createVerification(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Verification Created !!",
    success: true,
    data: result,
  });
});

const getVerification = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getVerification");
  const result = await verificationService.getVerification(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Verification successfull !!",
    success: true,
    data: result,
  });
});

const getVerifications = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getVerifications");
  const result = await verificationService.getVerifications();
  sendResponse(res, {
    statusCode: 200,
    message: "Get Verifications successfull !!",
    success: true,
    data: result,
  });
});

const updateVerification = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateVerification");
  const result = await verificationService.updateVerification(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Verification successfull !!",
    success: true,
    data: result,
  });
});

const deleteVerification = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteVerification");
  const result = await verificationService.deleteVerification(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Verification successfull !!",
    success: true,
    data: result,
  });
});

export const verificationController = {
  createVerification,
  getVerification,
  getVerifications,
  updateVerification,
  deleteVerification,
};

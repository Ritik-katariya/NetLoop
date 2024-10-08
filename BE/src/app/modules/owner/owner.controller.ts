import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Owner } from "@prisma/client";
import { ownerService } from "./owner.service";
import { logger } from "../../../shared/logger";

const sendOTP = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:sendOTP");
  const result = await ownerService.sendOTP(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully OTP Send !!",
    success: true,
    data: result,
  });
});
const reSendOtponEmail = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:reSendOtponEmail");
  const result = await ownerService.reSendOtponEmail(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully OTP Send !!",
    success: true,
    data: result,
  });
});
const createOwner = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createOwner");
  const result = await ownerService.createOwner(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Owner Created !!",
    success: true,
    data: result,
  });
});
const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:verifyOTP");
  const result = await ownerService.verifyOTP(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "OTP verify successfull !!",
    success: true,
    data: result,
  });
});

export const ownerController = {
  createOwner,
  sendOTP,
  reSendOtponEmail,
  verifyOTP,
};

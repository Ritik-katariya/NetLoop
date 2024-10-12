import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Members } from "@prisma/client";
import { memberService } from "./member.service";
import { logger } from "../../../shared/logger";
import { memberFilltersData } from "./member.interface";
import pick from "../../../shared/pick";
const sendOTP = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:sendOTP");
  const result = await memberService.sendOTP(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully OTP Send !!",
    success: true,
    data: result,
  });
});
const reSendOtponEmail = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:reSendOtponEmail");
  const result = await memberService.reSendOtponEmail(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully OTP Send !!",
    success: true,
    data: result,
  });
});
const createMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createMember");
  const result = await memberService.createMember(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Owner Created !!",
    success: true,
    data: result,
  });
});
const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:verifyOTP");
  const result = await memberService.verifyOTP(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "OTP verify successfull !!",
    success: true,
    data: result,
  });
});

const getAllMember = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, memberFilltersData);
  const result = await memberService.getAllMember(filter);
  sendResponse(res, {
      statusCode: 200,
      message: 'Successfully Retrieve Staff  !!',
      success: true,
      data: result
  })
})



const getoneMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneOwner");
  const result = await memberService.getoneMember(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Owner successfull !!",
    success: true,
    data: result,
  });
});
const updateMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateOwner");
  const result = await memberService.updateMember(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Owner successfull !!",
    success: true,
    data: result,
  });
});
const deleteMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteOwner");
  const result = await memberService.deleteMember(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Owner successfull !!",
    success: true,
    data: result,
  });
});

export const memberController = {
  createMember,
  sendOTP,
  reSendOtponEmail,
  verifyOTP,
  getoneMember,
  updateMember,
  deleteMember,
  getAllMember,
  
};

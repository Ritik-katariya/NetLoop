import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Members } from "@prisma/client";
import { memberService } from "./profile.service";
import { logger } from "../../../shared/logger";
import { memberFilltersData } from "./profile.interface";
import pick from "../../../shared/pick";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createMember");
  const result = await memberService.createProfile(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Profile Created !!",
    success: true,
    data: result,
  });
});


const getoneProfile = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneOwner");
  const result = await memberService.getProfile(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Profile successfull !!",
    success: true,
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateOwner");
  const result = await memberService.updateProfile(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Profile successfull !!",
    success: true,
    data: result,
  });
});
const updateCoverImg = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateCoverImage");
  const result = await memberService.updateCoverImg(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update cover Image successfull !!",
    success: true,
    data: result,
  });
});
const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteOwner");
  const result = await memberService.deleteProfile(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Profile successfull !!",
    success: true,
    data: result,
  });
});

export const profileController = {
createProfile,
  getoneProfile,
  updateProfile,
  deleteProfile,
updateCoverImg
};

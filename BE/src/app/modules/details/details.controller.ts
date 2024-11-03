import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { memberService } from "./details.service";
import { logger } from "../../../shared/logger";


const createDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createDetails");
  const result = await memberService.createDetails(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Profile Created !!",
    success: true,
    data: result,
  });
});

const getoneDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneDetails");
  const result = await memberService.getDetails(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Profile successfull !!",
    success: true,
    data: result,
  });
});
const updateDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateDetails");
  const result = await memberService.updateDetails(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Profile successfull !!",
    success: true,
    data: result,
  });
});

const deleteDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteDetails");
  const result = await memberService.deleteDetails(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Profile successfull !!",
    success: true,
    data: result,
  });
});

export const detailsController = {
 createDetails,
  getoneDetails,
  updateDetails,
  deleteDetails
};

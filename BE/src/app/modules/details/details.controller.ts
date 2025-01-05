import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { detailsService } from "./details.service";
import { logger } from "../../../shared/logger";


const createDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createDetails");
  const result = await detailsService.createDetails(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Profile Created !!",
    success: true,
    data: result,
  });
});

const getoneDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneDetails");
  const result = await detailsService.getDetails(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Profile successfull !!",
    success: true,
    data: result,
  });
});
const getEducation = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getEducation");
  const result = await detailsService.getEducation(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Education successfull !!",
    success: true,
    data: result,
  });
});
const getWork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getWork");
  const result = await detailsService.getWork(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Work successfull !!",
    success: true,
    data: result,
  });
});
const updateDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateDetails");
  const result = await detailsService.updateDetails(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Profile successfull !!",
    success: true,
    data: result,
  });
});
const updateEducation = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateEducation");
  const result = await detailsService.updateEducation(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Education successfull !!",
    success: true,
    data: result,
  });
});
const updateWork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateWork");
  const result = await detailsService.updateWork(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Work successfull !!",
    success: true,
    data: result,
  });
});

const deleteDetails = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteDetails");
  const result = await detailsService.deleteDetails(req.params.id);
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
  deleteDetails,
  updateEducation,
  updateWork,
  getEducation,
  getWork,

};

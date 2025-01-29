import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ratingService } from "./rating.service";
import { logger } from "../../../shared/logger";

// Create Rating
const createRating = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:createRating");
  const result = await ratingService.createRating(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Rating Created !!",
    success: true,
    data: result,
  });
});

// Get a single Rating
const getRating = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getRating");
  const result = await ratingService.getRating(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Rating successful !!",
    success: true,
    data: result,
  });
});

// Get all Ratings
const getAllRatings = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getAllRatings");
  const result = await ratingService.getAllRatings();
  sendResponse(res, {
    statusCode: 200,
    message: "Get all Ratings successful !!",
    success: true,
    data: result,
  });
});

// Update Rating
const updateRating = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:updateRating");
  const result = await ratingService.updateRating(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Rating successful !!",
    success: true,
    data: result,
  });
});

// Delete Rating
const deleteRating = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:deleteRating");
  const result = await ratingService.deleteRating(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Rating successful !!",
    success: true,
    data: result,
  });
});

// Get Ratings by Explore ID
const getRatingsByExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getRatingsByExplore");
  const result = await ratingService.getRatingsByExplore(req.params.exploreId);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Ratings by Explore successful !!",
    success: true,
    data: result,
  });
});

const submitRating = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:submitRating");
  const id=req.params.id;
  const {memberId,ratingValue}=req.body;

  const result = await ratingService.submitRating(id,memberId,ratingValue);
  sendResponse(res, {
    statusCode: 200,
    message: "Submit Rating successful!!",
    success: true,
    data: result,
  });
});
export const ratingController = {
  createRating,
  getRating,
  getAllRatings,
  updateRating,
  deleteRating,
  getRatingsByExplore,
  submitRating
};

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { exploreService } from "./explore.service";
import { logger } from "../../../shared/logger";

// Create Explore
const createExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createExplore");
  const result = await exploreService.createExplore(req);
  sendResponse(res, {
    statusCode: 201,
    message: "Explore created successfully!",
    success: true,
    data: result,
  });
});

// Get one Explore by ID (Supports random ordering)
const getExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getExplore");
  const random = req.query.random === "true"; // Check for random order
  const result = await exploreService.getExplore(req.params.id, random);
  sendResponse(res, {
    statusCode: 200,
    message: "Explore fetched successfully!",
    success: true,
    data: result,
  });
});

// Get all Explores (Latest-first, prioritizing likes >10)
const getAllExplores = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getAllExplores");
  const result = await exploreService.getAllExplores();
  sendResponse(res, {
    statusCode: 200,
    message: "All Explores fetched successfully!",
    success: true,
    data: result,
  });
});

// Update Explore
const updateExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: updateExplore");
  const result = await exploreService.updateExplore(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Explore updated successfully!",
    success: true,
    data: result,
  });
});

// Delete Explore
const deleteExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteExplore");
  const result = await exploreService.deleteExplore(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Explore deleted successfully!",
    success: true,
    data: result,
  });
});

export const exploreController = {
  createExplore,
  getExplore,
  getAllExplores,
  updateExplore,
  deleteExplore,
};

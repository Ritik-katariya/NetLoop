import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { storyService } from "./story.service";
import { logger } from "../../../shared/logger";

const createStory = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createStory");
  const result = await storyService.createStory(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Story Created !!",
    success: true,
    data: result,
  });
});

const getOneStory = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getOneStory");
  const result = await storyService.getStory(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Story successful !!",
    success: true,
    data: result,
  });
});

const getStories = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getStories");
  const result = await storyService.getStories(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Stories successful !!",
    success: true,
    data: result,
  });
});

const updateStory = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: updateStory");
  const result = await storyService.updateStory(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Story successful !!",
    success: true,
    data: result,
  });
});

const deleteStory = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteStory");
  const result = await storyService.deleteStory(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Story successful !!",
    success: true,
    data: result,
  });
});

const getStoryByMember = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getStoriesByMember");
  const result = await storyService.getStoryByMember(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Stories by member successful!!",
    success: true,
    data: result,
  });
});

export const storyController = {
  createStory,
  getOneStory,
  getStories,
  updateStory,
  deleteStory,
  getStoryByMember,
};

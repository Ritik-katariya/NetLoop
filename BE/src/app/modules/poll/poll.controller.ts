import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { pollService } from "./poll.service";
import { logger } from "../../../shared/logger";

const createPoll = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:createPoll");
  const result = await pollService.createPoll(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Poll created successfully!",
    success: true,
    data: result,
  });
});

const getPoll = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getPoll");
  const result = await pollService.getPoll(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Poll retrieved successfully!",
    success: true,
    data: result,
  });
});

const getAllPolls = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getAllPolls");
  const result = await pollService.getAllPolls();
  sendResponse(res, {
    statusCode: 200,
    message: "All polls retrieved successfully!",
    success: true,
    data: result,
  });
});

const updatePoll = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:updatePoll");
  const result = await pollService.updatePoll(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Poll updated successfully!",
    success: true,
    data: result,
  });
});

const deletePoll = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:deletePoll");
  const result = await pollService.deletePoll(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Poll deleted successfully!",
    success: true,
    data: result,
  });
});

const getPollsByExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getPollsByExplore");
  const result = await pollService.getPollsByExplore(req.params.exploreId);
  sendResponse(res, {
    statusCode: 200,
    message: "Polls by explore retrieved successfully!",
    success: true,
    data: result,
  });
});

const votePoll = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:votePoll");
  const { id } = req.params;
  const {memberId, optionIndex } = req.body;
  const result = await pollService.votePoll(id,memberId, optionIndex);
  sendResponse(res, {
    statusCode: 200,
    message: "Vote registered successfully!",
    success: true,
    data: result,
  });
});

export const pollController = {
  createPoll,
  getPoll,
  getAllPolls,
  updatePoll,
  deletePoll,
  getPollsByExplore,
  votePoll,
};

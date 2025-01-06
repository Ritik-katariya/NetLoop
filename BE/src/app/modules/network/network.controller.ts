import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { networkService } from "./network.service";
import { logger } from "../../../shared/logger";

const createNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: createNetwork");
  const result = await networkService.createNetwork(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Network Created !!",
    success: true,
    data: result,
  });
});

const getOneNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getOneNetwork");
  const result = await networkService.getNetwork(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Network successful !!",
    success: true,
    data: result,
  });
});

const addMemberToNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: addMemberToNetwork");
  const result = await networkService.addMemberToNetwork(req, res);
  sendResponse(res, {
    statusCode: 200,
    message: "Add member successful !!",
    success: true,
    data: result,
  });
});

const memberWithNetworks = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: memberWithNetworks");
  const result = await networkService.memberWithNetworks(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get member with Networks successful !!",
    success: true,
    data: result,
  });
});

const networkWithMembers = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: networkWithMembers");
  const result = await networkService.networkWithMembers(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Network with members successful !!",
    success: true,
    data: result,
  });
});

const getAllNetworks = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: getAllNetworks");
  const result = await networkService.getNetworks();
  sendResponse(res, {
    statusCode: 200,
    message: "Get all Networks successful !!",
    success: true,
    data: result,
  });
});

const updateNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: updateNetwork");
  const result = await networkService.updateNetwork(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Network successful !!",
    success: true,
    data: result,
  });
});

const deleteNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller: deleteNetwork");
  const result = await networkService.deleteNetwork(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Network successful !!",
    success: true,
    data: result,
  });
});

export const networkController = {
  createNetwork,
  getOneNetwork,
  getAllNetworks,
  updateNetwork,
  deleteNetwork,
  addMemberToNetwork,
  memberWithNetworks,
  networkWithMembers,
};

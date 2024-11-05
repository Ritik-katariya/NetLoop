import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { networkService } from "./network.service";
import { logger } from "../../../shared/logger";


const createNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createNetwork");
  const result = await networkService.createNetwork(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Network Created !!",
    success: true,
    data: result,
  });
});

const getoneNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneNetwork");
  const result = await networkService.getNetwork(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Profile successfull !!",
    success: true,
    data: result,
  });
});
const  AddMember= catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneNetwork");
  const result = await networkService.AddMember(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Add member successfull !!",
    success: true,
    data: result,
  });
});
const memberwithnetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneNetwork");
  const result = await networkService.memberWithNetworks(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get member with Networks successfull !!",
    success: true,
    data: result,
  });
});
const networkWithMembers = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneNetwork");
  const result = await networkService.networkWithMembers(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Network with member successfull !!",
    success: true,
    data: result,
  });
});
const getallNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getallNetwork");
  const result = await networkService.getNetworks();
  sendResponse(res, {
    statusCode: 200,
    message: "Get Profile successfull !!",
    success: true,
    data: result,
  });
});
const updateNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateNetwork");
  const result = await networkService.updateNetwork(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Network successfull !!",
    success: true,
    data: result,
  });
});

const deleteNetwork = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteNetwork");
  const result = await networkService.deleteNetwork(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Network successfull !!",
    success: true,
    data: result,
  });
});

export const networkController = {
 createNetwork,
  getoneNetwork,
  getallNetwork,
  updateNetwork,
  deleteNetwork,
  AddMember,
  memberwithnetwork,
  networkWithMembers,
 
};

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { clusterService } from "./cluster.service";
import { logger } from "../../../shared/logger";


const createCluster = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createCluster");
  const result = await clusterService.createCluster(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Cluster Created !!",
    success: true,
    data: result,
  });
});

const getoneCluster = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneCluster");
  const result = await clusterService.getCluster(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Cluster successfull !!",
    success: true,
    data: result,
  });
});
const  AddMember= catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneNetwork");
  const result = await clusterService.AddMember(req,res);
  sendResponse(res, {
    statusCode: 200,
    message: "Add member successfull !!",
    success: true,
    data: result,
  });
});
const memberwithCluster = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneCluster");
  const result = await clusterService.memberWithClusters(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get member with Cluster successfull !!",
    success: true,
    data: result,
  });
});
const clusterWithMembers = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getoneCluster");
  const result = await clusterService.clusterWithMembers(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Cluster with member successfull !!",
    success: true,
    data: result,
  });
});
const getallCluster = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getallCluster");
  const result = await clusterService.getClusters();
  sendResponse(res, {
    statusCode: 200,
    message: "Get Cluster successfull !!",
    success: true,
    data: result,
  });
});
const updateCluster = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updateCluster");
  const result = await clusterService.updateCluster(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Cluster successfull !!",
    success: true,
    data: result,
  });
});

const deleteCluster = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deleteCluster");
  const result = await clusterService.deleteCluster(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Cluster successfull !!",
    success: true,
    data: result,
  });
});

export const clusterController = {
 createCluster,
  getoneCluster,
  getallCluster,
  updateCluster,
  deleteCluster,
  AddMember,
  memberwithCluster,
  clusterWithMembers,
 
};

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { promotionService } from "./promotion.service";
import { logger } from "../../../shared/logger";

const createPromotion = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:createPromotion");
  const result = await promotionService.createPromotion(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Promotion Created !!",
    success: true,
    data: result,
  });
});

const getPromotion = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getPromotion");
  const result = await promotionService.getPromotion(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Promotion successful !!",
    success: true,
    data: result,
  });
});

const getAllPromotions = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getAllPromotions");
  const result = await promotionService.getAllPromotions();
  sendResponse(res, {
    statusCode: 200,
    message: "Get all Promotions successful !!",
    success: true,
    data: result,
  });
});

const updatePromotion = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:updatePromotion");
  const result = await promotionService.updatePromotion(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Promotion successful !!",
    success: true,
    data: result,
  });
});

const deletePromotion = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:deletePromotion");
  const result = await promotionService.deletePromotion(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Promotion successful !!",
    success: true,
    data: result,
  });
});

const getPromotionsByExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getPromotionsByExplore");
  const result = await promotionService.getPromotionsByExplore(req.params.exploreId);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Promotions by Explore successful !!",
    success: true,
    data: result,
  });
});

export const promotionController = {
  createPromotion,
  getPromotion,
  getAllPromotions,
  updatePromotion,
  deletePromotion,
  getPromotionsByExplore,
};

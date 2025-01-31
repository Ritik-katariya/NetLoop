import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { newsService } from "./news.service";
import { logger } from "../../../shared/logger";

const createNews = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:createNews");
  const result = await newsService.createNews(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully News Created !!",
    success: true,
    data: result,
  });
});

const getNews = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getNews");
  const result = await newsService.getNews(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get News successful !!",
    success: true,
    data: result,
  });
});

const getAllNews = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getAllNews");
  const result = await newsService.getAllNews();
  sendResponse(res, {
    statusCode: 200,
    message: "Get all News successful !!",
    success: true,
    data: result,
  });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:updateNews");
  const result = await newsService.updateNews(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update News successful !!",
    success: true,
    data: result,
  });
});

const deleteNews = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:deleteNews");
  const result = await newsService.deleteNews(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete News successful !!",
    success: true,
    data: result,
  });
});

const getNewsByExplore = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside controller:getNewsByExplore");
  const result = await newsService.getNewsByExplore(req.params.exploreId);
  sendResponse(res, {
    statusCode: 200,
    message: "Get News by Explore successful !!",
    success: true,
    data: result,
  });
});

export const newsController = {
  createNews,
  getNews,
  getAllNews,
  updateNews,
  deleteNews,
  getNewsByExplore,
};

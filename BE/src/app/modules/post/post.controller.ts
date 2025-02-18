import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { postService } from "./post.service";
import { logger } from "../../../shared/logger";



const createPost = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:createPost");
  const result = await postService.createPost(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Post Created !!",
    success: true,
    data: result,
  });
});


const getonePost = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getonePost");
  const result = await postService.getPost(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Post successfull !!",
    success: true,
    data: result,
  });
});
const getHomePagePosts = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getonePost");
  const result = await postService.getHomePagePosts(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Post successfull !!",
    success: true,
    data: result,
  });
});
const getPosts = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:getPosts");
  const result = await postService.getPosts();
  sendResponse(res, {
    statusCode: 200,
    message: "Get Posts successfull !!",
    success: true,
    data: result,
  });
});
const updatePost = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:updatePost");
  const result = await postService.updatePost(req);
  sendResponse(res, {
    statusCode: 200,
    message: "Update Post successfull !!",
    success: true,
    data: result,
  });
});
const deletePost = catchAsync(async (req: Request, res: Response) => {
  logger.info("insider controller:deletePost");
  const result = await postService.deletePost(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Delete Post successfull !!",
    success: true,
    data: result,
  });
});
const getPostbyMember=catchAsync(async (req:Request,res:Response) => {
  logger.info("Get post by member ")
  const result = await postService.getPostbyMember(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Get Post by member successfull!!",
    success: true,
    data: result,
  });
});

export const postController = {
  createPost,
  getonePost,
  getPosts,
  updatePost,
  deletePost,
  getPostbyMember,
  getHomePagePosts
};

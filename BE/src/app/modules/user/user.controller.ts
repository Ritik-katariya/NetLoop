import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { logger } from "../../../shared/logger";
import { UserService } from "./user.service";
import { User } from "@prisma/client";

const createUser = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside UserController :: createUser()");
  await UserService.createUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully User Created !!",
    success: true,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside UserController :: getAllUser()");
  const result = await UserService.getAllUser();
  sendResponse<User[]>(res, {
    statusCode: 200,
    message: "Successfully Get User !!",
    success: true,
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
};

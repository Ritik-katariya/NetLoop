import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { Secret } from "jsonwebtoken";
import { superAdminService } from "./superAdmin.service";
import { JwtHelper } from "../../../helper/jwtToken";
import config from "../../../config";

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminService.createSuperAdmin(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Super Admin created successfully",
    data: result,
  });
});

const loginSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminService.loginSuperAdmin(req.body);

  const accessToken = JwtHelper.createToken(
    {
      id: result.id,
      role: 'SUPER_ADMIN',
      status: result.status,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in || '1h'
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Super Admin logged in successfully",
    data: { ...result, accessToken },
  });
});

const getSuperAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminService.getSuperAdminById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Super Admin retrieved successfully",
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminService.updateSuperAdmin(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Super Admin updated successfully",
    data: result,
  });
});

export const superAdminController = {
  createSuperAdmin,
  loginSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
}; 
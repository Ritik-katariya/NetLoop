import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { Secret } from "jsonwebtoken";
import { adminService } from "./admin.service";
import { JwtHelper } from "../../../helper/jwtToken";
import config from "../../../config";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.createAdmin(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.loginAdmin(req.body);

  const accessToken = JwtHelper.createToken(
    {
      id: result.id,
      role: result.role,
      status: result.status,
    },
    config.jwt.secret as Secret,
    config.jwt.secret as string || '1h'
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Admin logged in successfully",
    data: { ...result, accessToken },
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllAdmins();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Admins retrieved successfully",
    data: result,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAdminById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateAdmin(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  await adminService.deleteAdmin(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Admin deleted successfully",
  });
});

export const adminController = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
}; 
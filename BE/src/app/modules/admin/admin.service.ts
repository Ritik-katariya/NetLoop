import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Admin } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";

const createAdmin = async (data: {
  email: string;
  password: string;
  name: string;
  role?: "ADMIN" | "MODERATOR" | "SUPER_ADMIN";
}): Promise<Partial<Admin>> => {
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: data.email },
  });

  if (existingAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Admin already exists");
  }

  if(data.email!==config.adminEmail){
    throw new ApiError(httpStatus.BAD_REQUEST, "Access denied..bye..");
    
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);


  const admin = await prisma.admin.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return admin;
};

const loginAdmin = async (data: {
  email: string;
  password: string;
}): Promise<Partial<Admin>> => {
  const admin = await prisma.admin.findUnique({
    where: { email: data.email },
  });

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    admin.password
  );
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  if (!admin.status) {
    throw new ApiError(httpStatus.FORBIDDEN, "Admin account is inactive");
  }

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    status: admin.status,
  };
};

const getAllAdmins = async (): Promise<Partial<Admin>[]> => {
  const admins = await prisma.admin.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return admins;
};

const getAdminById = async (id: string): Promise<Partial<Admin>> => {
  const admin = await prisma.admin.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  return admin;
};

const updateAdmin = async (
  id: string,
  data: Partial<Admin>
): Promise<Partial<Admin>> => {
  const admin = await prisma.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  if (data.password) {
    data.password =  await bcrypt.hash(data.password, 10);
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return updatedAdmin;
};

const deleteAdmin = async (id: string): Promise<void> => {
  const admin = await prisma.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  await prisma.admin.delete({ where: { id } });
};

export const adminService = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
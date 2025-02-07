import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { SuperAdmin } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";

const createSuperAdmin = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<Partial<SuperAdmin>> => {
  const existingSuperAdmin = await prisma.superAdmin.findUnique({
    where: { email: data.email },
  });

  if (existingSuperAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Super Admin already exists");
  }

  // Only allow creation if email matches the configured super admin email
  if (data.email !== config.superAdminEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, "Not authorized to create super admin");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const superAdmin = await prisma.superAdmin.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      createdAt: true,
    },
  });

  return superAdmin;
};

const loginSuperAdmin = async (data: {
  email: string;
  password: string;
}): Promise<Partial<SuperAdmin>> => {
  const superAdmin = await prisma.superAdmin.findUnique({
    where: { email: data.email },
  });

  if (!superAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Super Admin not found");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    superAdmin.password
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  if (!superAdmin.status) {
    throw new ApiError(httpStatus.FORBIDDEN, "Super Admin account is inactive");
  }

  return {
    id: superAdmin.id,
    email: superAdmin.email,
    name: superAdmin.name,
    status: superAdmin.status,
  };
};

const getSuperAdminById = async (id: string): Promise<Partial<SuperAdmin>> => {
  const superAdmin = await prisma.superAdmin.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      createdAt: true,
    },
  });

  if (!superAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Super Admin not found");
  }

  return superAdmin;
};

const updateSuperAdmin = async (
  id: string,
  data: Partial<SuperAdmin>
): Promise<Partial<SuperAdmin>> => {
  const superAdmin = await prisma.superAdmin.findUnique({ where: { id } });

  if (!superAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Super Admin not found");
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedSuperAdmin = await prisma.superAdmin.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      createdAt: true,
    },
  });

  return updatedSuperAdmin;
};

export const superAdminService = {
  createSuperAdmin,
  loginSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
}; 
import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { User } from "@prisma/client";

export const create = async (payload: any): Promise<User> => {
  try {
    const data = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: payload,
      });

      return user; // Make sure to return the created user
    });

    return data;
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

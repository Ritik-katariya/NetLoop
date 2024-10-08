import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { Table } from "@prisma/client";

export const createTable = async (payload: any): Promise<Table> => {
  try {
    const data = await prisma.$transaction(async (tx) => {
      const table = await tx.table.create({
        data: payload,
      });

      return table;
    });

    return data;
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

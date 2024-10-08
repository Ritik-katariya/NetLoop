import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { logger } from "../../../shared/logger";
import { TableService } from "./table.service";
import { Table } from "@prisma/client";

const createTable = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside TableController :: createTable()");
  await TableService.createTable(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Table Created !!",
    success: true,
  });
});

const getAllTables = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside TableController :: getAllTables()");
  const result = await TableService.getAllTables();
  sendResponse<Table[]>(res, {
    statusCode: 200,
    message: "Successfully Retrieved All Tables !!",
    success: true,
    data: result,
  });
});

const getTableById = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside TableController :: getTableById()");
  const result = await TableService.getTableById(Number(req.params.id));
  sendResponse<Table>(res, {
    statusCode: 200,
    message: "Successfully Retrieved Table !!",
    success: true,
    data: result,
  });
});

const updateTable = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside TableController :: updateTable()");
  await TableService.updateTable(Number(req.params.id), req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Updated Table !!",
    success: true,
  });
});

const deleteTable = catchAsync(async (req: Request, res: Response) => {
  logger.info("Inside TableController :: deleteTable()");
  await TableService.deleteTable(Number(req.params.id));
  sendResponse(res, {
    statusCode: 200,
    message: "Successfully Deleted Table !!",
    success: true,
  });
});

export const TableController = {
  createTable,
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
};

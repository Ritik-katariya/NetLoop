import prisma from "../../../shared/prisma";
import { Table } from "@prisma/client";
import { createTable as create } from "./tableService";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createTable = async (payload: any): Promise<any> => {
  const result = await create(payload);
  return result;
};

const getAllTables = async (): Promise<Table[] | null> => {
  const result = await prisma.table.findMany();
  return result;
};

const getTableById = async (id: number): Promise<Table | null> => {
  const result = await prisma.table.findUnique({ where: { id } });
  return result;
};

const updateTable = async (id: number, payload: any): Promise<Table | null> => {
  const result = await prisma.table.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteTable = async (id: number): Promise<Table | null> => {
  const result = await prisma.table.update({
    where: { id },
    data: { isDeleted: true },
  });
  return result;
};

export const TableService = {
  createTable,
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
};

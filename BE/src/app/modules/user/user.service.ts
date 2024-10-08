import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { create } from "./userService";
import { Request } from "express";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createUser = async (payload: any): Promise<any> => {
    const result = await create(payload)
    return result;
}

const getAllUser = async (): Promise<User[] | null> => {
    const result = await prisma.user.findMany();
    return result;
}


export const UserService = {
    createUser,
    getAllUser
}
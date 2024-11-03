import { Details, Members, Profile } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request, Response } from "express";
import { time } from "console";

//use for create a Profile
const createDetails = async (req: Request, res: Response): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const { memberId, ...othersData } = req.body;

    const isExists: Members | null = await tx.members.findUnique({
      where: { id: memberId },
    });
    if (!isExists) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    const details: Details = await tx.details.create({
      data: { ...othersData, memberId },
    });
    return details;
  });
  return data;
};

const updateDetails = async (req: any): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { ...othersData } = req.body;
      const detailsId: string = req.params.id;

      const details = await tx.details.update({
        where: { id: detailsId },
        data: othersData,
      });
      return details;
    },
    { timeout: 5000 }
  );
  return data;
};

const getDetails = async (id: string): Promise<Details> => {
  if (!id) throw new Error("id is required");
  console.log(id);
  const result: any = await prisma.details.findFirst({ where: { id: id } });

  return result;
};

const deleteDetails = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const details = await tx.details.delete({
      where: {
        id: id,
      },
    });
    return details;
  });

  return result;
};

export const memberService = {
  createDetails,
  updateDetails,
  getDetails,
  deleteDetails,
};

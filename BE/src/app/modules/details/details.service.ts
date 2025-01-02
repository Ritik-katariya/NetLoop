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

const updateDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id: detailsId } = req.params;
    const { education, work, ...detailsData } = req.body;

    const data = await prisma.$transaction(async (tx) => {
      // Check if details exist
      const existingDetails = await tx.details.findUnique({
        where: { id: detailsId },
      });

      if (!existingDetails) {
        return res.status(404).json({
          success: false,
          message: "Details not found",
        });
      }

      // Update `Details`
      const updatedDetails = await tx.details.update({
        where: { id: detailsId },
        data: detailsData,
      });

      // Update or create `Education`
      if (education && Array.isArray(education)) {
        for (const edu of education) {
          if (edu.id) {
            // If `id` exists, update the record
            await tx.education.update({
              where: { id: edu.id },
              data: { ...edu, detailsid: detailsId },
            });
          } else {
            // Otherwise, create a new record
            await tx.education.create({
              data: { ...edu, detailsid: detailsId },
            });
          }
        }
      }

      // Update or create `Work`
      if (work && Array.isArray(work)) {
        for (const w of work) {
          if (w.id) {
            // If `id` exists, update the record
            await tx.work.update({
              where: { id: w.id },
              data: { ...w, detailsid: detailsId },
            });
          } else {
            // Otherwise, create a new record
            await tx.work.create({
              data: { ...w, detailsid: detailsId },
            });
          }
        }
      }

      return updatedDetails;
    });
    // Set a timeout for the transaction
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Transaction timed out")), 2000000));
    return Promise.race([data, timeoutPromise]);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating details",
      error: (error as Error).message,
    });
  }
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

export const detailsService = {
  createDetails,
  updateDetails,
  getDetails,
  deleteDetails,
};

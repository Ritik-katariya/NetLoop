import {Profile } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helper/uploadHelper";


//use for create a Profile
const createProfile = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const file = req.file as any;
      const { ...othersData } = req.body;
      if (file) {
        const uploadImage = await CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
          othersData.img = uploadImage.secure_url;
        } else {
          throw new ApiError(
            httpStatus.EXPECTATION_FAILED,
            "Failed to Upload Image"
          );
        }
      }

     try { const profile = await tx.profile.create({ data: othersData });

     return profile;
      
     } catch (error) {
      console.log(error);
     }
    },
    {
      timeout: 50000, // 10 seconds timeout for the entire transaction
    }
  );
  return data;
};

const updateCoverImg = async (req: any): Promise<Profile> => {
  const data = await prisma.$transaction(async (tx) => {
    const file = req.files as any;
    const { ...othersData } = req.body;

    if (file) {
      const uploadImage = await CloudinaryHelper.uploadFile(file);
      if (uploadImage) {
        othersData.coverImg = uploadImage.secure_url;
      } else {
        throw new ApiError(
          httpStatus.EXPECTATION_FAILED,
          "Failed to Upload Image"
        );
      }
    }
    const profile = await tx.profile.update({
      where: { id: req.params.id },
      data: othersData,
    });
    return profile;
  });
  return data;
};

const getProfile = async (id: string): Promise<Profile | null> => {

  if (!id) throw new Error("id is required");

  const result = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateProfile = async (req: Request): Promise<Profile> => {
  const file = req.file as IUpload;
  const id = req.params.id as string;
  const { ...othersData } = req.body;

  if (file) {
    const uploadImage = await CloudinaryHelper.uploadFile(file);
    if (uploadImage) {
      othersData.img = uploadImage.secure_url;
    } else {
      throw new ApiError(
        httpStatus.EXPECTATION_FAILED,
        "Failed to Upload Image"
      );
    }
  }
  const result = await prisma.profile.update({
    where: { id },
    data: othersData,
  });
  return result;
};
const deleteProfile = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const patient = await tx.profile.delete({
      where: {
        id: id,
      },
    });
  });
  return result;
};

export const memberService = {
  updateProfile,
  deleteProfile,
  getProfile,
  createProfile,
  updateCoverImg,
};

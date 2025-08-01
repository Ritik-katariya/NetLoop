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
        const uploadImage = await CloudinaryHelper.uploadImage(file);
        if (uploadImage) {
          othersData.img = uploadImage.secure_url;
        } else {
          throw new ApiError(
            httpStatus.EXPECTATION_FAILED,
            "Failed to Upload Image"
          );
        }
      }

     try {
       const profile = await tx.profile.create({ data: othersData });
       const details= await tx.details.create({data:{profileId:profile.id}});
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
    const file = req.file as any;
    const { flag,...othersData } = req.body;

    if (file) {
      const uploadImage = await CloudinaryHelper.uploadImage(file);
      if (uploadImage) {
        if(flag==='1'){
          othersData.coverImg = uploadImage.secure_url;
        }
        else{
          othersData.img = uploadImage.secure_url;
        }
      } else {
        throw new ApiError(
          httpStatus.EXPECTATION_FAILED,
          "Failed to Upload Image"
        );
      }
    }
    try {
      const profile = await tx.profile.update({
        where: { id: req.params.id },
        data: othersData,
      });
      return profile;
      
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update profile");
      
    }
  }, {
    timeout: 200000
  });
  return data;
};

const getProfile = async (id: string): Promise<Profile | null> => {

  if (!id) throw new Error("id is required");

  const result = await prisma.profile.findUnique({
    where: {
      id: id,
    },
    include: {
      details: true,
    },
  });
  return result;
};

const updateProfile = async (req: Request): Promise<Profile> => {
  const file = req.file as Express.Multer.File;
  const id = req.params.id as string;
  let { pincode, dob, gender, ...othersData } = req.body.data;
const member = await prisma.members.findUnique({ where: { id }, select: { profile: true } });
if (!member || !member.profile) throw new Error("Member or profile not found!");

// Check if profile exists
const existingProfile = await prisma.profile.findUnique({ where: { id: member.profile.id } });
if (!existingProfile) throw new Error("Profile not found!");

  // Validate pincode
  othersData.pincode = pincode && !isNaN(parseInt(pincode)) ? parseInt(pincode) : null;

  // Validate dob
  const parsedDob = dob ? new Date(dob) : null;
  if (parsedDob && isNaN(parsedDob.getTime())) {
    throw new Error("Invalid date format for 'dob'. Expected YYYY-MM-DD.");
  }
  othersData.dob = parsedDob;

  // Validate gender
  const validGenders = ["MALE", "FEMALE", "OTHER"];
  othersData.gender = validGenders.includes(gender) ? gender : null;

  // Upload image if provided
  if (file) {
    const uploadImage = await CloudinaryHelper.uploadImage(file);
    if (uploadImage) {
      othersData.img = uploadImage.secure_url;
    } else {
      throw new Error("Failed to Upload Image");
    }
  }

  try {
    const result = await prisma.profile.update({
      where: { id:member.profile.id },
      data: {memberId:id, ...othersData},
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update profile");
  }
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

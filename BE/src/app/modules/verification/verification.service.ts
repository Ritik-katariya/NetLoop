import { Verified } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
// import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create a Verification
const createVerification = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const files = req.files as { adharimg?: any; realphoto?: any; enrollmentimg?: any };
      const { memberId, adharno, enrollmentno, ...otherData } = req.body;

      // Validate if memberId exists in the Members table
      const memberExists = await tx.members.findUnique({
        where: { id: memberId },
      });
      if (!memberExists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
      }

    if (files?.adharimg) {
      const uploadAdharImg = await CloudinaryHelper.uploadImage(files.adharimg[0]);
      if (uploadAdharImg) {
        otherData.adharimg = uploadAdharImg.secure_url;
      } else {
        throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload adhar image");
      }
    }

    if (files?.realphoto) {
      const uploadRealPhoto = await CloudinaryHelper.uploadImage(files.realphoto[0]);
      if (uploadRealPhoto) {
        otherData.realphoto = uploadRealPhoto.secure_url;
      } else {
        throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload real photo");
      }
    }

    if (files?.enrollmentimg) {
      const uploadEnrollmentImg = await CloudinaryHelper.uploadImage(files.enrollmentimg[0]);
      if (uploadEnrollmentImg) {
        otherData.enrollmentimg = uploadEnrollmentImg.secure_url;
      } else {
        throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload enrollment image");
      }
    }
    // Create verification
    try {
      const verification: Verified | null = await tx.verified.create({
      data: { ...otherData, memberId, adharno, enrollmentno },
      });
      return verification;
    } catch (error) {
      console.error(error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create verification");
    }
    },
    {
    timeout: 500000, // 10 seconds timeout for the transaction
    }
  );

  return data;
};

// Get a single Verification by ID
const getVerification = async (id: string): Promise<Verified | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.verified.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Verification not found");
  }

  return result;
};

// Get all Verifications
const getVerifications = async (): Promise<Verified[]> => {
  const result = await prisma.verified.findMany();
  return result;
};

// Update a Verification
const updateVerification = async (req: Request): Promise<Verified> => {
  const files = req.files as { adharimg?: any; realphoto?: any; enrollmentimg?: any };
  const id = req.params.id as string;
  const { ...otherData } = req.body;

  // Handle adhar image upload
  if (files?.adharimg) {
    const uploadAdharImg = await CloudinaryHelper.uploadImage(files.adharimg[0]);
    if (uploadAdharImg) {
      otherData.adharimg = uploadAdharImg.secure_url;
    } else {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload adhar image");
    }
  }

  // Handle real photo upload
  if (files?.realphoto) {
    const uploadRealPhoto = await CloudinaryHelper.uploadImage(files.realphoto[0]);
    if (uploadRealPhoto) {
      otherData.realphoto = uploadRealPhoto.secure_url;
    } else {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload real photo");
    }
  }

  // Handle enrollment image upload
  if (files?.enrollmentimg) {
    const uploadEnrollmentImg = await CloudinaryHelper.uploadImage(files.enrollmentimg[0]);
    if (uploadEnrollmentImg) {
      otherData.enrollmentimg = uploadEnrollmentImg.secure_url;
    } else {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, "Failed to upload enrollment image");
    }
  }

  const result = await prisma.verified.update({
    where: { id },
    data: otherData,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Verification not found");
  }

  return result;
};

// Delete a Verification
const deleteVerification = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    try {
      const verification = await tx.verified.delete({
        where: { id },
      });
      return verification;
    } catch (error) {
      throw new Error(`Verification delete failed: ${(error as Error).message}`);
    }
  });

  return result;
};

export const verificationService = {
  createVerification,
  updateVerification,
  getVerification,
  deleteVerification,
  getVerifications,
};

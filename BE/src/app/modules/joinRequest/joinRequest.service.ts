import prisma from "../../../shared/prisma";
import { Request } from "express";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { CloudinaryHelper } from "../../../helper/uploadHelper";

// Create Join Request
const createJoinRequest = async (req: Request): Promise<any> => {
  return await prisma.$transaction(async (tx) => {
    const file = req.file as any;
    const { memberId, networkId, profession, enrollmentNo } = req.body;

    if (!memberId || !networkId || !enrollmentNo) {
      throw new ApiError(httpStatus.BAD_REQUEST, "All fields are required");
    }

    // Check if the member already has a join request
    const existingRequest = await tx.joinRequest.findFirst({
      where: { memberId, networkId },
    });

    if (existingRequest) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "You have already sent a join request."
      );
    }

    let documentUrl = "";
    if (file) {
      const upload = await CloudinaryHelper.uploadImage(file);
      documentUrl = upload.secure_url;
    }

    try {
      const joinRequest = await tx.joinRequest.create({
        data: {
          member: { connect: { id: memberId } },
          network: { connect: { id: networkId } },
          profession,
          enrollmentNo,
          document: documentUrl,
        },
      });

      return joinRequest;
    } catch (error) {
      console.error("Failed to create join request:", error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Join request creation failed"
      );
    }
  },{timeout: 50000});
};

// Get a single Join Request by ID
const getJoinRequestById = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.joinRequest.findUnique({
    where: { id },
    include: {
      member: {
        include: {
          profile: {
            select: { img: true },
          },
        },
      },
      network: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Join request not found");
  }

  return result;
};

// Get all Join Requests for a Member
const getJoinRequestsForMember = async (memberId: string): Promise<any[]> => {
  if (!memberId)
    throw new ApiError(httpStatus.BAD_REQUEST, "Member ID is required");

  return await prisma.joinRequest.findMany({
    where: { memberId },
    orderBy: { createdAt: "desc" },
    include: { network: true },
  });
};

// Get all Join Requests for a Network
const getJoinRequestsForNetwork = async (networkId: string): Promise<any[]> => {
  if (!networkId)
    throw new ApiError(httpStatus.BAD_REQUEST, "Network ID is required");

  return await prisma.joinRequest.findMany({
    where: { networkId },
    orderBy: { createdAt: "desc" },
    include: { member: { include: { profile: { select: { img: true } } } } },
  });
};

// Delete Join Request
const deleteJoinRequest = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  try {
    return await prisma.joinRequest.delete({ where: { id } });
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Join request deletion failed"
    );
  }
};
const getAllJoinRequest = async (): Promise<any[]> => {
  return await prisma.joinRequest.findMany({
    include: {
      member: true,
      network: true,
    },
  });
};  

// Export JoinRequest Service
export const joinRequestService = {
  createJoinRequest,
  getJoinRequestById,
  getJoinRequestsForMember,
  getJoinRequestsForNetwork,
  deleteJoinRequest,
  getAllJoinRequest,
};

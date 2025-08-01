import { Network, Members } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request, Response } from "express";
import ApiError from "../../../errors/apiError";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { request } from "http";
// Add a member to a network
const addMemberToNetwork = async (req: Request, res: Response) => {
  const { memberId, networkId } = req.params;
  const { requestId } = req.body;
  const member = await prisma.members.findFirst({
    where: { id: memberId }
  });

 
 try {
  const updateMember= await prisma.network.update({
    where: { id: networkId },
    data: {
      members: {
        connect: { id: memberId },
      },
    },
  });
const deleteRequest=await prisma.joinRequest.delete({where: {id: requestId}})

  return updateMember;
 } catch (error) {
  throw new Error("Failed to add member to network");
  
 }
};

// Fetch a member with their networks
const memberWithNetworks = async (id: string) => {
  const memberWithNetwork = await prisma.members.findUnique({
    where: { id },
    include: { networks: true },
  });
  return memberWithNetwork;
};

// Fetch a network with its members
const networkWithMembers = async (id: string) => {
  const networkWithMembers = await prisma.network.findMany({
    where: { id },
    include: { members: {select:{id:true,name:true,status:true}} },
  });
  return networkWithMembers;
};

// Create a network
const createNetwork = async (req: Request): Promise<any> => {
  const { memberId, pincode, followers, ...networkData } = req.body;
  const files = req.files as { [fieldname: string]: IUpload[] };
  const logo: IUpload = files?.logo?.[0];
  const cover: IUpload = files?.cover?.[0];
  const member = await prisma.members.findFirst({
    where: { id: memberId },
    select: { verified: true }
  });

  if (!member?.verified?.verified) {
    throw new ApiError(400, "Member is not verified");
  }
  let logoUrl: string | null = null;
  let coverUrl: string | null = null;

  try {
    if (logo) {
      const logoResponse = await CloudinaryHelper.uploadImage(logo as Express.Multer.File);
      logoUrl = logoResponse.url;
    }
    if (cover) {
      const coverResponse = await CloudinaryHelper.uploadImage(cover as Express.Multer.File);
      coverUrl = coverResponse.url;
    }
  } catch (error) {
    throw new ApiError(400, "File upload error");
  }
  
  try {
    const network = await prisma.network.create({
      data: {
        pincode,
        followers,
        logo: logoUrl,
        cover: coverUrl,
        ...networkData,
        members: {
          connect: { id: memberId },
        },
      },
    });

  const explore=await prisma.explore.create({
    data:{
      networkId:network.id
    }
  })


    return network;
  } catch (error) {
    throw new Error("Network error: " + JSON.stringify(error));
  }
};

// Update a network
const updateNetwork = async (req: Request): Promise<any> => {
  const { ...othersData } = req.body;
  const networkId: string = req.params.id;

  const data = await prisma.$transaction(
    async (tx) => {
      const details = await tx.network.update({
        where: { id: networkId },
        data: othersData,
      });
      return details;
    },
    { timeout: 10000 }
  );
  return data;
};

// Get a network by ID
const getNetwork = async (id: string): Promise<Network> => {
  if (!id) throw new Error("ID is required");

  const result: any = await prisma.network.findFirst({
    where: { id, verified: true },
    include: {
    members: {
      include: {
        profile: {
          select: { img: true }
        }
      }
     
    },
      likes: true,
      
    },
  });

  return result;
};

// Get all networks
const getNetworks = async (): Promise<Network[]> => {
  try {
    const networks: Network[] = await prisma.network.findMany({
      where: { verified: true },
      include: {
        members: {
          select:{id:true,name:true},
        },
        likes: true,
        
      },
    });

    if (!networks.length) {
      return [];
    }

    return networks;
  } catch (error) {
    throw new Error((error as any).message || "Internal server error");
  }
};

// Delete a network
const deleteNetwork = async (req: Request): Promise<any> => {
  const networkId: string = req.params.id;
  const result = await prisma.$transaction(async (tx) => {
    const details = await tx.network.delete({
      where: {
        id: networkId,
      },
    });
    return details;
  });

  return result;
};

export const networkService = {
  createNetwork,
  updateNetwork,
  getNetwork,
  getNetworks,
  deleteNetwork,
  addMemberToNetwork,
  memberWithNetworks,
  networkWithMembers,
};

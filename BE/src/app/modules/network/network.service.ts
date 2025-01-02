import { Network,Members} from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request, Response } from "express";
import { time } from "console";





// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const AddMember=async function addMemberToNetwork(req:Request, res:Response) {
  const {memberId,networkId} = req.body;
  await prisma.network.update({
    where: { id: networkId },
    data: {
      members: {connect: { id: memberId }, // Connect the existing member to the network
      },
    },
  });
}















// Fetch a member with their networks
const memberWithNetworks=async(id:string) =>{

  
  const memberwithnetwork= await prisma.members.findUnique({
    where: { id},
    include: { networks: true },
  });
  return memberwithnetwork;
}


// Fetch a network with its members
const networkWithMembers=async(id:string)=>{
  
  const networkwithmembers  = await prisma.network.findUnique({
  where: { id },
  include: { members: true },
});
return networkwithmembers;
}










//use for create a Profile
const createNetwork = async (req: Request, res: Response): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const { memberId, ...networkData } = req.body;
    const network = await prisma.network.create({
      data: {
        ...networkData,
        members: {
          connect: { id: memberId },
        },
      },
    });
    return network;
  });
  return data;
};

const updateNetwork = async (req: any): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { ...othersData } = req.body;
      const networkId: string = req.params.id;

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

const getNetwork = async (id: string): Promise<Network> => {
  if (!id) throw new Error("id is required");
  
  const result: any = await prisma.network.findFirst({ where: { id: id ,verified:true} });

  return result;
};
const getNetworks = async (): Promise<Network[]> => {
  
  
  const result: any = await prisma.network.findMany({ where: {verified:true} });

  return result;
};

const deleteNetwork = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const details = await tx.network.delete({
      where: {
        id: id,
       
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
  AddMember,
  memberWithNetworks,
  networkWithMembers,
};

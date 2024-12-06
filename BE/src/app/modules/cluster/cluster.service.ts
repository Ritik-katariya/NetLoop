import { Cluster, Members } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request, Response } from "express";
import { time } from "console";

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const AddMember = async function addMemberToNetwork(
  req: Request,
  res: Response
) {
  const { memberId, clusterId } = req.body;
  await prisma.cluster.update({
    where: { id: clusterId },
    data: {
      Members: {
        connect: { id: memberId }, // Connect the existing member to the network
      },
    },
  });
};

// Fetch a member with their networks
const memberWithClusters = async (id: string) => {
  const memberwithnetwork = await prisma.members.findUnique({
    where: { id },
    include: { Cluster: true },
  });
  return memberwithnetwork;
};

// Fetch a network with its members
const clusterWithMembers = async (id: string) => {
  const networkwithmembers = await prisma.cluster.findUnique({
    where: { id },
    include: { Members: true },
  });
  return networkwithmembers;
};

//use for create a Profile
const createCluster = async (req: Request, res: Response): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const { memberId, ...clusterData } = req.body;
    const network = await prisma.cluster.create({
      data: {
        ...clusterData,
        members: {
          connect: { id: memberId },
        },
      },
    });
    return network;
  });
  return data;
};

const updateCluster = async (req: any): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { ...othersData } = req.body;
      const clusterId: string = req.params.id;

      const details = await tx.cluster.update({
        where: { id: clusterId },
        data: othersData,
      });
      return details;
    },
    { timeout: 10000 }
  );
  return data;
};

const getCluster = async (id: string): Promise<Cluster> => {
  if (!id) throw new Error("id is required");

  const result: any = await prisma.cluster.findFirst({ where: { id: id } });

  return result;
};
const getClusters = async (): Promise<Cluster[]> => {
  const result: any = await prisma.cluster.findMany();

  return result;
};

const deleteCluster = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const details = await tx.cluster.delete({
      where: {
        id: id,
      },
    });
    return details;
  });

  return result;
};

export const clusterService = {
  createCluster,
  updateCluster,
  getCluster,
  getClusters,
  deleteCluster,
  AddMember,
  memberWithClusters,
  clusterWithMembers,
};

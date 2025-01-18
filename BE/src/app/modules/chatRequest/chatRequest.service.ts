import prisma from "../../../shared/prisma";
import { ChatRequest } from "@prisma/client";
import { Request, Response } from "express";

const createChatRequest = async (req: Request, res: Response): Promise<any> => {
  const { memberId, senderId, message } = req.body;

  const chatRequest = await prisma.chatRequest.create({
    data: {
      memberId,
      senderId,
      message,
    },
  });

  return chatRequest;
};

const getChatRequestById = async (id: string): Promise<any> => {
  const chatRequest = await prisma.chatRequest.findUnique({
    where: { id },
  });

  return chatRequest;
};

const getChatRequestsForMember = async (memberId: string): Promise<any[]> => {
  const chatRequests = await prisma.chatRequest.findMany({
    where: { memberId },
  });

  return chatRequests;
};

const deleteChatRequest = async (id: string): Promise<any> => {
  const deletedChatRequest = await prisma.chatRequest.delete({
    where: { id },
  });

  return deletedChatRequest;
};

export const chatRequestService = {
  createChatRequest,
  getChatRequestById,
  getChatRequestsForMember,
  deleteChatRequest,
};

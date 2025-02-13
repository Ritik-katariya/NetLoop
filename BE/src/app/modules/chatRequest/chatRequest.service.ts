import prisma from "../../../shared/prisma";
import { Request, Response } from "express";

const createChatRequest = async (req: Request, res: Response): Promise<any> => {
  const { memberId, senderId, message } = req.body;
const isPre=await prisma.chatRequest.findFirst({ where:{memberId: memberId, senderId: senderId}});
  if(isPre){
    return res.status(409).json({ error: "You have already sent a chat request to this member." });
  }
  try {
    if (!memberId || !senderId || !message) {
      return res
        .status(400)
        .json({ error: "All fields (memberId, senderId, message) are required." });
    }

    const chatRequest = await prisma.chatRequest.create({
      data: { memberId, senderId, message },
    });

    return res.status(201).json({ success: true, data: chatRequest });
  } catch (error) {
    console.error("Error creating chat request:", error);
    return res.status(500).json({ error: "Send chat request failed." });
  }
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
    orderBy:{createdAt:"asc"},
    include:{
        sender:{include:{
          profile:true,
         
        }},
    }
  });

  return chatRequests;
};

const deleteChatRequest = async (id: string): Promise<any> => {
  try {
    
    const deletedChatRequest = await prisma.chatRequest.delete({
      where: { id },
    });

    return deletedChatRequest;
  } catch (error) {
    console.error("Error deleting chat request:", error);
    throw new Error("Delete chat request failed.");
  }
};

export const chatRequestService = {
  createChatRequest,
  getChatRequestById,
  getChatRequestsForMember,
  deleteChatRequest,
};

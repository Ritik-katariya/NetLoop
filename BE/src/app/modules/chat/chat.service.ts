import { Chat, Members } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request, Response } from "express";

// Add a new chat
const createChat = async (req: Request, res: Response): Promise<any> => {
  try {
    const { memberId } = req.body;

  const isMember= await prisma.members.findUnique({where:{id:memberId}});
  if (!isMember) {
    throw new Error("Member not found.");
    
  }

    const chat = await prisma.chat.create({
      data: {
        memberId,
        // members: {
        //   connect:{id:userId},
        // },
      }
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Failed to create chat." });
  }
};

// Fetch all chats for a member
const getChatsForMember = async (memberId: string): Promise<Chat[]> => {
  if (!memberId) throw new Error("memberId is required");

  const chats = await prisma.chat.findMany({
    where: {
     memberId
    },
    include: {
      members: {
        include:{
          profile:true,
        }
      },
    },
  });

  return chats;
};

// Fetch a chat by its ID
const getChatById = async (id: string): Promise<Chat | null> => {
  if (!id) throw new Error("Chat ID is required");

  const chat = await prisma.chat.findUnique({
    where: { id },
    include: {
      members: true,
    },
  });

  return chat;
};

// Add a member to an existing chat
const addMemberToChat = async (req: Request, res: Response): Promise<any> => {
  try {
    const {  memberId } = req.body;
    const chatId=req.params.id;
    const ischat=await prisma.chat.findUnique({where:{id:chatId}});
    const isMember=await prisma.members.findUnique({where:{id:memberId}});
    if(!ischat||!isMember)throw new Error("Data are not valid please check again"); 

    const chat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        members: {
          connect: { id: memberId },
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error adding member to chat:", error);
    res.status(500).json({ message: "Failed to add member to chat." });
  }
};

// Delete a chat
const deleteChat = async (id: string): Promise<any> => {
  if (!id) throw new Error("Chat ID is required");

  const result = await prisma.chat.delete({
    where: { id },
  });

  return result;
};

export const chatService = {
  createChat,
  getChatsForMember,
  getChatById,
  addMemberToChat,
  deleteChat,
};

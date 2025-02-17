import { Chat, ChatRequest } from "@prisma/client";
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

   return chat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw new Error("Failed to create chat");
    
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
    const { memberId, requestId } = req.body;
    const chatId = req.params.id;

    // Validate chat and member existence
    const ischat = await prisma.chat.findUnique({ where: { id: chatId } });
    const isMember = await prisma.members.findUnique({ where: { id: memberId } });
    if (!ischat) throw new Error("Chat not found");
    if (!isMember) throw new Error("Member not found");

    // Add member to the chat
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

    // Check for another chat linked to the same member
    const chat2 = await prisma.chat.findFirst({
      where: {
        memberId,
      },
    });

    if (chat2 && chat2.id !== chatId) {
     const ch= await prisma.chat.update({
        where: { id: chat2.id },
        data: {
          members: {
            connect: { id: ischat?.memberId },
          },
        },
      });
      console.log(ch)
    }

    // Delete the chat request
    if (requestId) {
      await prisma.chatRequest.delete({ where: { id: requestId } });
    } else {
      console.warn("No requestId provided, skipping deletion of chatRequest.");
    }

   return chat;
  } catch (error) {
    console.error("Error adding member to chat:", error);
   throw new Error("Failed to add member to chat");
   
  }
};

const removeMemberFromChat = async (req: Request, res: Response): Promise<any> => {
  try {
    const { memberId } = req.body;
    const chatId = req.params.id;

    // Validate chat existence
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { members: true },
    });

    if (!chat) {
      throw new Error("failed to find");
      
    }

    // Check if the member exists in the chat
    const isMemberInChat = chat.members.some((member) => member.id === memberId);

    if (!isMemberInChat) {
      throw new Error("failed to find");
      
    }

    // Remove the member from the chat
   const chats= await prisma.chat.update({
      where: { id: chatId },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
    });

    return chats;
  } catch (error) {
    console.error("Error removing member from chat:", error);
   throw new Error("failed to remove member from chat");
   
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
  removeMemberFromChat,
};

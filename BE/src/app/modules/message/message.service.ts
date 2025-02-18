import prisma from "../../../shared/prisma";
import { Message } from "@prisma/client";
import { Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";


export const createMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId) {
      throw new Error("Sender ID and Receiver ID are required.");
    }

    let fileUrl: string | null = null;

    // Check if a file is included in the request
    const file = req.file as Express.Multer.File | undefined;
    if (file) {
      try {
        // Upload the file to Cloudinary
        const uploadResult = await CloudinaryHelper.uploadImage(file);
        if (uploadResult) {
          fileUrl = uploadResult.secure_url;
        } else {
          console.error("Cloudinary upload returned null result");
        }
      } catch (uploadError) {
        console.error("Failed to upload file to Cloudinary:", uploadError);
        throw new Error("Failed to upload file.");
      }
    }

    // Save the message to the database
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
        file: fileUrl,
      },
    });

    // Prepare the message data for socket emission
    const messageData = {
      id: newMessage.id,
      senderId,
      receiverId,
      message,
      file: fileUrl,
      createdAt: newMessage.createdAt
    };

    // Emit the message through socket if receiver is online
   

    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

const getMessagesBetweenUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      throw new Error("Sender ID and Receiver ID are required.");
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

const deleteMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw new Error("Message ID is required.");
    }

    const message = await prisma.message.delete({
      where: { id },
    });

    return message;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

const getAllMessagesForUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new Error("User ID is required.");
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Error fetching messages for user:", error);
    throw error;
  }
};

export const messageService = {
  createMessage,
  getMessagesBetweenUsers,
  deleteMessage,
  getAllMessagesForUser,
};

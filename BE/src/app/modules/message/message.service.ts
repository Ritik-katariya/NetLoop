import prisma from "../../../shared/prisma";
import { Message } from "@prisma/client";
import { Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
export const createMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender and receiver IDs are required." });
    }

    let fileUrl: string | null = null;

    // Check if a file is included in the request
    const file = req.file as Express.Multer.File | undefined;
    if (file) {
      // Upload the file to Cloudinary
      const uploadResult = await CloudinaryHelper.uploadImage(file);
      if (uploadResult) {
        fileUrl = uploadResult.secure_url; // Retrieve the file URL from Cloudinary response
      } else {
        return res.status(500).json({ message: "Failed to upload file to Cloudinary." });
      }
    }

    // Save the message to the database
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
        file: fileUrl, // Store the Cloudinary file URL if available
      },
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ message: "Failed to send message." });
  }
}

const getMessagesBetweenUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender and receiver IDs are required." });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: {
        createdAt: "asc", // Sorting messages by creation time
      },
    });

    res.status(200).json({
      message: "Messages fetched successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};

const deleteMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required." });
    }

    const deletedMessage = await prisma.message.delete({
      where: { id: messageId },
    });

    res.status(200).json({
      message: "Message deleted successfully.",
      data: deletedMessage,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message." });
  }
};

const getAllMessagesForUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
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

    res.status(200).json({
      message: "All messages for user fetched successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages for user:", error);
    res.status(500).json({ message: "Failed to fetch messages for user." });
  }
};

export const messageService = {
  createMessage,
  getMessagesBetweenUsers,
  deleteMessage,
  getAllMessagesForUser,
};

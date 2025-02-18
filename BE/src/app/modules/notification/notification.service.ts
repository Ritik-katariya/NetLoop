import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { io } from "../../../socketio/server";

declare global {
  var onlineUsers: Map<string, string>;
}

const createNotification = async ({
  type,
  senderId,
  receiverId,
  content,
  targetId = null,
  targetType = null,
}: {
  type: "LIKE" | "COMMENT" | "CHAT_REQUEST" | "MESSAGE" | "FOLLOW" | "MENTION";
  senderId: string;
  receiverId: string;
  content: string;
  targetId?: string | null;
  targetType?: string | null;
}) => {
  if (!receiverId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "receiverId is required");
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        type,
        senderId,
        receiverId,
        content,
        targetId,
        targetType,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                img: true,
              },
            },
          },
        },
      },
    });

    // Emit notification via Socket.IO if receiver is online
    if (global.onlineUsers && io) {
      const receiverSocketId = global.onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", notification);
      }
    }

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create notification");
  }
};



const getNotifications = async (receiverId: string, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        receiverId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                img: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const total = await prisma.notification.count({
      where: { receiverId },
    });

    const unreadCount = await prisma.notification.count({
      where: {
        receiverId,
        isRead: false,
      },
    });

    return {
      notifications,
      meta: {
        total,
        unreadCount,
        page,
        limit,
        hasMore: skip + limit < total,
      },
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch notifications");
  }
};

const markAsRead = async (notificationId: string, receiverId: string) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, receiverId },
    });

    if (!notification) {
      throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");
    }

    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    return ;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to mark notification as read");
  }
};

const markAllAsRead = async (receiverId: string) => {
  try {
    await prisma.notification.updateMany({
      where: {
        receiverId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return ;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to mark notifications as read");
  }
};

const deleteNotification = async (notificationId: string, receiverId: string) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, receiverId },
    });

    if (!notification) {
      throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");
    }

    await prisma.notification.delete({
      where: { id: notificationId },
    });

    return ;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete notification");
  }
};

export const notificationService = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
}; 
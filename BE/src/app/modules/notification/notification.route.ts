import express from "express";
import { notificationController } from "./notification.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create notification
router.post(
  "/create",
  // auth(),
  notificationController.createNotification
);

// Get notifications for a member
router.get(
  "/:receiverId",
  auth(),
  notificationController.getNotifications
);

// Mark notification as read
router.patch(
  "/:notificationId/read",
  auth(),
  notificationController.markAsRead
);

// Mark all notifications as read
router.patch(
  "/:receiverId/read-all",
  auth(),
  notificationController.markAllAsRead
);

// Delete notification
router.delete(
  "/:notificationId",
  auth(),
  notificationController.deleteNotification
);

export const notificationRouter = router; 
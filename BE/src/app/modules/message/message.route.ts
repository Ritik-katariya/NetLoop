import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { messageController } from "./message.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Route to create a new message with optional file upload
router.post(
  "/",
  CloudinaryHelper.upload.single("file"),auth(), // Middleware to handle file uploads to Cloudinary
  (req: Request, res: Response, next: NextFunction) => {
    return messageController.createMessage(req, res, next);
  }
);

// Route to fetch all messages exchanged between two users
router.get("/:senderId/:receiverId",auth(), messageController.getMessagesBetweenUsers);

// Route to fetch all messages for a specific user
router.get("/user/:userId",auth(), messageController.getAllMessagesForUser);

// Route to delete a specific message
router.delete("/:id",auth(), messageController.deleteMessage);

export const messageRoutes = router;

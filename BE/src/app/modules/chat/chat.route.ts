import express from "express";
import { chatController } from "./chat.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create a new chat
router.post("/",auth(), chatController.createChat);

// Get a chat by ID
router.get("/:id",auth(), chatController.getChatById);

// Get all chats for a specific member
router.get("/member/:memberId",auth(), chatController.getChatsForMember);

// Add a member to a chat
router.patch("/add-member/:id",auth(), chatController.addMemberToChat);

router.patch("/remove-member/:id",auth(), chatController.removeMemberFromChat);

// Delete a chat by ID
router.delete("/:id",auth(), chatController.deleteChat);

export const chatRoutes = router;

import express from "express";
import { chatController } from "./chat.controller";

const router = express.Router();

// Create a new chat
router.post("/", chatController.createChat);

// Get a chat by ID
router.get("/:id", chatController.getChatById);

// Get all chats for a specific member
router.get("/member/:memberId", chatController.getChatsForMember);

// Add a member to a chat
router.patch("/add-member/:id", chatController.addMemberToChat);

router.patch("/remove-member/:id", chatController.removeMemberFromChat);

// Delete a chat by ID
router.delete("/:id", chatController.deleteChat);

export const chatRoutes = router;

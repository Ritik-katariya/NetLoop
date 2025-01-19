import express from "express";
import { chatRequestController } from "./chatRequest.controller";

const router = express.Router();

// Create a ChatRequest
router.post("/", chatRequestController.createChatRequest);
router.post("/create", chatRequestController.createChatRequest)

// Get a ChatRequest by ID
router.get("/:id", chatRequestController.getChatRequestById);

// Get all ChatRequests for a specific member
router.get("/member/:memberId", chatRequestController.getChatRequestsForMember);

// Delete a ChatRequest by ID
router.delete("/:id", chatRequestController.deleteChatRequest);

export const chatRequestRoutes = router;

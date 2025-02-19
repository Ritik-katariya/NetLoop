import express from "express";
import { chatRequestController } from "./chatRequest.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create a ChatRequest
router.post("/",auth(), chatRequestController.createChatRequest);
router.post("/create",auth(), chatRequestController.createChatRequest)

// Get a ChatRequest by ID
router.get("/:id",auth(), chatRequestController.getChatRequestById);

// Get all ChatRequests for a specific member
router.get("/member/:memberId",auth(), chatRequestController.getChatRequestsForMember);

// Delete a ChatRequest by ID
router.delete("/:id",auth(), chatRequestController.deleteChatRequest);

export const chatRequestRoutes = router;

import express from "express";
import { savedPostController } from "./savedPost.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Toggle save status
router.post(
  "/toggle",
  auth(),
  savedPostController.toggleSave
);

// Get saved items for a member
router.get(
  "/:memberId",
  auth(),
  savedPostController.getSavedItems
);

// Check save status
router.get(
  "/status",
  auth(),
  savedPostController.checkSaveStatus
);

export const savedPostRouter = router; 
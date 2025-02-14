import express from "express";
import { likeController } from "./like.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Toggle like
router.post(
  "/toggle",
  // auth(),
  likeController.toggleLike
);

// Get likes for a target
router.get(
  "/:targetType/:targetId",
  // auth(),
  likeController.getLikes
);

// Check like status
router.get(
  "/status",
  // auth(),
  likeController.checkLikeStatus
);

export const likeRouter = router; 
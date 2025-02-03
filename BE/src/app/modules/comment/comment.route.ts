import express from "express";
import { commentController } from "./comment.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create a comment
router.post(
  "/create",
  auth(),
  commentController.createComment
);

// Get comments for a post
router.get(
  "/:postId",
  auth(),
  commentController.getComments
);

// Get replies for a comment
router.get(
  "/replies/:commentId",
  auth(),
  commentController.getReplies
);

// Update a comment
router.patch(
  "/:id",
  auth(),
  commentController.updateComment
);

// Delete a comment
router.delete(
  "/:id",
  auth(),
  commentController.deleteComment
);

export const commentRouter = router; 
import express from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { joinRequestController } from "./joinRequest.controller";

const router = express.Router();

// 🟢 Create Join Request (with Document Upload)
router.post(
  "/",
  CloudinaryHelper.upload.single("document"), // Handles document upload
  joinRequestController.createJoinRequest
);

// 🟢 Get a Single Join Request by ID
router.get("/:id", joinRequestController.getJoinRequestById);

// 🟢 Get Join Requests for a Specific Member
router.get("/member/:memberId", joinRequestController.getJoinRequestsForMember);

// 🟢 Get Join Requests for a Specific Network
router.get("/network/:networkId", joinRequestController.getJoinRequestsForNetwork);

// 🔴 Delete Join Request by ID
router.delete("/:id", joinRequestController.deleteJoinRequest);

export const joinRequestRouter = router;

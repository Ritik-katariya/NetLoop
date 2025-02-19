import express from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { joinRequestController } from "./joinRequest.controller";
import auth from "../../middlewares/auth";
import { SuperAdminRole } from "../superAdmin/superAdmin.middleware";

const router = express.Router();

// 🟢 Create Join Request (with Document Upload)
router.post(
  "/",
  CloudinaryHelper.upload.single("document"),auth(), // Handles document uploadauth(),
  joinRequestController.createJoinRequest
);

// 🟢 Get a Single Join Request by ID
router.get("/:id",auth(), joinRequestController.getJoinRequestById);
router.get("/", joinRequestController.getAllJoinRequest);

// 🟢 Get Join Requests for a Specific Member
router.get("/member/:memberId",auth(), joinRequestController.getJoinRequestsForMember);

// 🟢 Get Join Requests for a Specific Network
router.get("/network/:networkId",auth(), joinRequestController.getJoinRequestsForNetwork);

// 🔴 Delete Join Request by ID
router.delete("/:id",auth(), joinRequestController.deleteJoinRequest);

export const joinRequestRouter = router;

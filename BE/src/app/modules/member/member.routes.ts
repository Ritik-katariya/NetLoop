import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { memberController } from "./member.controller";

router.post("/", memberController.createMember);
router.post("/sendotp", memberController.sendOTP);
router.post("/verifyOTP", memberController.verifyOTP);
router.get("/", memberController.getAllMember);
router.get("/:id?", memberController.getoneMember);
router.get("/chat-request-member/:id?", memberController.getAllMembersExceptSelfAndRequested)
router.patch("/:id?", memberController.updateMember);
router.delete("/:id?", memberController.deleteMember);


export const memberRouter = router;

import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { memberController } from "./member.controller";
import auth from "../../middlewares/auth";

router.post("/", memberController.createMember);
router.post("/sendotp", memberController.sendOTP);
router.post("/verifyOTP", memberController.verifyOTP);
router.get("/", memberController.getAllMember);
router.get("/:id?",auth(), memberController.getoneMember);
router.get("/chat-request-member/:id?",auth(), memberController.getAllMembersExceptSelfAndRequested)
router.patch("/:id?",auth(), memberController.updateMember);
router.delete("/:id?",auth(), memberController.deleteMember);


export const memberRouter = router;

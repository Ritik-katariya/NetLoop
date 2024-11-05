import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { networkController } from "./network.controller";

router.post("/", networkController.createNetwork);
router.patch("/addmember", networkController.AddMember);

router.get("/", networkController.getallNetwork);
router.get("/:id", networkController.getoneNetwork);
router.get("/member/:id", networkController.memberwithnetwork);
router.get("/network/:id", networkController.networkWithMembers);
router.patch("/:id?", networkController.updateNetwork);
router.delete("/:id?", networkController.deleteNetwork);

export const networkRouter = router;

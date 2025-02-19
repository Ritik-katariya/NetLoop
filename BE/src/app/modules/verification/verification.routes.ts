import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { verificationController } from "./verification.controller";
import { SuperAdminRole } from "../superAdmin/superAdmin.middleware";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/",auth(), CloudinaryHelper.upload.fields([
  { name: 'adharimg', maxCount: 1 },
  { name: 'realphoto', maxCount: 1 },
  { name: 'enrollmentimg', maxCount: 1 }
]), (req: Request, res: Response, next: NextFunction) => {
  return verificationController.createVerification(req, res, next);
});

router.get("/",auth(),SuperAdminRole(), verificationController.getVerifications);

router.get("/:id?",auth(), verificationController.getVerification);

router.patch("/:id?",auth(), CloudinaryHelper.upload.fields([
  { name: 'adharimg', maxCount: 1 },
  { name: 'realphoto', maxCount: 1 },
  { name: 'enrollmentimg', maxCount: 1 }
]), (req: Request, res: Response, next: NextFunction) => {
  return verificationController.updateVerification(req, res, next);
});

router.delete("/:id?",auth(), verificationController.deleteVerification);

export const verificationRouter = router;

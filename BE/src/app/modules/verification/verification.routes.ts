import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { verificationController } from "./verification.controller";

const router = express.Router();

router.post("/", CloudinaryHelper.upload.fields([
  { name: 'adharimg', maxCount: 1 },
  { name: 'realphoto', maxCount: 1 },
  { name: 'enrollmentimg', maxCount: 1 }
]), (req: Request, res: Response, next: NextFunction) => {
  return verificationController.createVerification(req, res, next);
});

router.get("/", verificationController.getVerifications);

router.get("/:id?", verificationController.getVerification);

router.patch("/:id?", CloudinaryHelper.upload.fields([
  { name: 'adharimg', maxCount: 1 },
  { name: 'realphoto', maxCount: 1 },
  { name: 'enrollmentimg', maxCount: 1 }
]), (req: Request, res: Response, next: NextFunction) => {
  return verificationController.updateVerification(req, res, next);
});

router.delete("/:id?", verificationController.deleteVerification);

export const verificationRouter = router;

import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { profileController } from "./profile.controller";

router.post(
  "/",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return profileController.createProfile(req, res, next);
  }
);
router.patch(
  "/coverimg/:id",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return profileController.updateCoverImg(req, res, next);
  }
);

router.get("/:id?", profileController.getoneProfile);
router.patch(
  "/:id?",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return profileController.updateProfile(req, res, next);
  }
);
router.delete("/:id?", profileController.deleteProfile);

export const profileRouter = router;

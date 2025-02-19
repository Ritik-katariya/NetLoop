import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { profileController } from "./profile.controller";
import auth from "../../middlewares/auth";

router.post("/",auth(),CloudinaryHelper.upload.single("file"),(req: Request, res: Response, next: NextFunction) => {
    return profileController.createProfile(req, res, next);
  }
);

router.patch("/banner/:id",auth(),CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return profileController.updateCoverImg(req, res, next);
  }
);

router.get("/:id?",auth(), profileController.getoneProfile);

router.patch("/:id?",auth(),CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return profileController.updateProfile(req, res, next);
  }
);

router.delete("/:id?",auth(), profileController.deleteProfile);

export const profileRouter = router;

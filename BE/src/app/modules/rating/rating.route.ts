import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { ratingController } from "./rating.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return ratingController.createRating(req, res, next);
  }
);

router.get("/",auth(), ratingController.getAllRatings);

router.get("/:id?",auth(), ratingController.getRating);

router.get("/explore/:exploreId?", auth(),ratingController.getRatingsByExplore);

router.patch(
  "/:id?",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return ratingController.updateRating(req, res, next);
  }
);
router.patch("/submit-vote/:id?",auth(),ratingController.submitRating)

router.delete("/:id?",auth(), ratingController.deleteRating);

export const ratingRouter = router;

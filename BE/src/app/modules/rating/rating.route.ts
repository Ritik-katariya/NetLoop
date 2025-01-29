import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { ratingController } from "./rating.controller";

const router = express.Router();

router.post(
  "/",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return ratingController.createRating(req, res, next);
  }
);

router.get("/", ratingController.getAllRatings);

router.get("/:id?", ratingController.getRating);

router.get("/explore/:exploreId?", ratingController.getRatingsByExplore);

router.patch(
  "/:id?",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return ratingController.updateRating(req, res, next);
  }
);
router.patch("submit-vote/:id?",ratingController.submitRating)

router.delete("/:id?", ratingController.deleteRating);

export const ratingRouter = router;

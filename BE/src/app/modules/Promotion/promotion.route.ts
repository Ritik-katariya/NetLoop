import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { promotionController } from "./promotion.controller";

const router = express.Router();

router.post(
  "/",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return promotionController.createPromotion(req, res, next);
  }
);

router.get("/", promotionController.getAllPromotions);

router.get("/:id?", promotionController.getPromotion);

router.get("/explore/:exploreId?", promotionController.getPromotionsByExplore);

router.patch(
  "/:id?",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return promotionController.updatePromotion(req, res, next);
  }
);

router.delete("/:id?", promotionController.deletePromotion);

export const promotionRouter = router;

import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { promotionController } from "./promotion.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return promotionController.createPromotion(req, res, next);
  }
);

router.get("/",auth(), promotionController.getAllPromotions);

router.get("/:id?", auth(),promotionController.getPromotion);

router.get("/explore/:exploreId?",auth(), promotionController.getPromotionsByExplore);

router.patch(
  "/:id?",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return promotionController.updatePromotion(req, res, next);
  }
);

router.delete("/:id?",auth(), promotionController.deletePromotion);

export const promotionRouter = router;

import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { newsController } from "./news.controller";

const router = express.Router();

router.post(
  "/",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return newsController.createNews(req, res, next);
  }
);

router.get("/", newsController.getAllNews);

router.get("/:id?", newsController.getNews);

router.get("/explore/:exploreId?", newsController.getNewsByExplore);

router.patch(
  "/:id?",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return newsController.updateNews(req, res, next);
  }
);

router.delete("/:id?", newsController.deleteNews);

export const newsRouter = router;

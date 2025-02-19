import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { newsController } from "./news.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return newsController.createNews(req, res, next);
  }
);

router.get("/",auth(), newsController.getAllNews);

router.get("/:id?",auth(), newsController.getNews);

router.get("/explore/:exploreId?",auth(), newsController.getNewsByExplore);

router.patch(
  "/:id?",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return newsController.updateNews(req, res, next);
  }
);

router.delete("/:id?",auth(), newsController.deleteNews);

export const newsRouter = router;

import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { storyController } from "./story.controller";

const router = express.Router();

router.post(
  "/",
  CloudinaryHelper.upload.single("file"),
  (req, res, next) => {
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    next();
  },
  storyController.createStory
);

router.get("/", storyController.getStories);

router.get("/:id", storyController.getOneStory);
router.get("/member/:id", storyController.getStoryByMember);

router.patch(
  "/:id",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return storyController.updateStory(req, res, next);
  }
);

router.delete("/:id", storyController.deleteStory);

export const storyRouter = router;

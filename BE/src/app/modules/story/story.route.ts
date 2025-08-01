import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { storyController } from "./story.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",auth(),
  CloudinaryHelper.upload.single("file"),
  (req, res, next) => {
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    next();
  },
  storyController.createStory
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // Validate query parameters
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const cursor = req.query.cursor as string | undefined;
  const networkId = req.query.networkId as string | undefined;

  // Add validated params to request
  req.query.limit = limit.toString();
  req.query.cursor = cursor;

  return storyController.getStories(req, res, next);
});

router.get("/:id",auth(), storyController.getOneStory);
router.get("/member/:id",auth(), storyController.getStoryByMember);

router.patch(
  "/:id",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return storyController.updateStory(req, res, next);
  }
);

router.delete("/:id",auth(), storyController.deleteStory);

export const storyRouter = router;

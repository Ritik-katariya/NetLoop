import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { pollController } from "./poll.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/",auth(),pollController.createPoll);

router.get("/", auth(),pollController.getAllPolls);

router.get("/:id?",auth(), pollController.getPoll);

router.get("/explore/:exploreId?",auth(), pollController.getPollsByExplore);

router.patch(
  "/:id?",auth(),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return pollController.updatePoll(req, res, next);
  }
);

router.delete("/:id?", auth(),pollController.deletePoll);

router.patch("/vote/:id?",auth(), pollController.votePoll);

export const pollRouter = router;

import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
import { pollController } from "./poll.controller";

const router = express.Router();

router.post("/",pollController.createPoll);

router.get("/", pollController.getAllPolls);

router.get("/:id?", pollController.getPoll);

router.get("/explore/:exploreId?", pollController.getPollsByExplore);

router.patch(
  "/:id?",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return pollController.updatePoll(req, res, next);
  }
);

router.delete("/:id?", pollController.deletePoll);

router.patch("/vote/:id?", pollController.votePoll);

export const pollRouter = router;

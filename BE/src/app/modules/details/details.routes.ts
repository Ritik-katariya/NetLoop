import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { detailsController } from "./details.controller";

router.post("/", detailsController.createDetails);

router.get("/:id", detailsController.getoneDetails);
router.put("/:id?", detailsController.updateDetails);
router.delete("/:id?", detailsController.deleteDetails);

export const detailsRouter = router;

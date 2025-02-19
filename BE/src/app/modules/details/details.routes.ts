import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { detailsController } from "./details.controller";
import auth from "../../middlewares/auth";

router.post("/",auth(), detailsController.createDetails);

router.get("/:id?",auth(), detailsController.getoneDetails);
router.patch("/:id?",auth(), detailsController.updateDetails);
router.delete("/:id?",auth(), detailsController.deleteDetails);
router.patch("work/:id?",auth(), detailsController.updateWork);
router.patch("education/:id",auth(), detailsController.updateEducation);
router.get("work/:id?",auth(), detailsController.getWork);
router.get("education/:id?",auth(), detailsController.getEducation);

export const detailsRouter = router;

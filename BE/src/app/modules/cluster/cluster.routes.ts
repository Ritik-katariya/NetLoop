import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { clusterController } from "./cluster.controller";

router.post("/", clusterController.createCluster);
router.patch("/addmember", clusterController.AddMember);

router.get("/", clusterController.getallCluster);
router.get("/:id", clusterController.getoneCluster);
router.get("/member/:id", clusterController.memberwithCluster);
router.get("/network/:id", clusterController.clusterWithMembers);
router.patch("/:id?", clusterController.updateCluster);
router.delete("/:id?", clusterController.deleteCluster);

export const clusterRouter = router;

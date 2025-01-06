import express from "express";
import { networkController } from "./network.controller";
import { CloudinaryHelper } from "../../../helper/uploadHelper";


const router = express.Router();


router.post("/", CloudinaryHelper.upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return networkController.createNetwork(req, res, next);
});
router.patch("/addmember", networkController.addMemberToNetwork);

router.get("/", networkController.getAllNetworks);
router.get("/:id", networkController.getOneNetwork);
router.get("/member/:id", networkController.memberWithNetworks);
router.get("/network/:id", networkController.networkWithMembers);
router.patch("/:id", CloudinaryHelper.upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return networkController.updateNetwork(req, res, next);
});
router.delete("/:id", networkController.deleteNetwork);

export const networkRouter = router;

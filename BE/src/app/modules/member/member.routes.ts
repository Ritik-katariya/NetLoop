import express, { NextFunction, Request, Response } from 'express';
import { CloudinaryHelper } from '../../../helper/uploadHelper';
const router = express.Router();
import { memberController } from './member.controller';




router.post('/',memberController.createMember);
router.post('/sendotp',memberController.sendOTP);
router.post('/resendotp',memberController.reSendOtponEmail);
router.post('/verifyOTP',memberController.verifyOTP);
router.get("/", memberController.getAllMember);
router.get("/:id?", memberController.getoneMember);
router.patch(
  "/:id?",
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return memberController.updateMember(req, res, next);
  }
);
router.delete("/:id?", memberController.deleteMember);



export const memberRouter = router;
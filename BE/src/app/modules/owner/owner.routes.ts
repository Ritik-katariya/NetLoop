import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();
import { ownerController } from './owner.controller';




router.post('/',ownerController.createOwner);
router.post('/sendotp',ownerController.sendOTP);
router.post('/resendotp',ownerController.reSendOtponEmail);
router.post('/verifyOTP',ownerController.verifyOTP);



export const ownerRouter = router;
import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/login', authController.login);
router.post('/reset-password', authController.resetpassword);
router.post("/forgot-password", authController.forgotpassword);
router.post("/set-new-password", authController.setNewPassword);

export const AuthRouter = router;
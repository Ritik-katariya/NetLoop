import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/login', authController.login);
router.post('/resetpassword', authController.resetpassword);

export const AuthRouter = router;
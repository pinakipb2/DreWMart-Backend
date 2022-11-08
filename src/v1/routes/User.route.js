import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/register-user', userController.registerUser);
router.post('/login-user', userController.loginUser);

export default router;

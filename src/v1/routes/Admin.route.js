import express from 'express';
import { adminController } from '../controllers';

const router = express.Router();

router.post('/add-admin', adminController.addAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/all-admins', adminController.getAll);

export default router;

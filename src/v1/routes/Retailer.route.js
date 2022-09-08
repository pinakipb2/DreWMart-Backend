import express from 'express';
import { retailerController } from '../controllers';

const router = express.Router();

router.post('/add-retailer', retailerController.addRetailer);

export default router;

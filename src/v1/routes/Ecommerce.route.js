import express from 'express';
import { ecommerceController } from '../controllers';

const router = express.Router();

router.post('/buy-products', ecommerceController.buyProducts);

export default router;

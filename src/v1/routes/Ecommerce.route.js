import express, { Router } from 'express';
import { ecommerceController } from '../controllers';

const router = express.Router();

router.post('/buy-products', ecommerceController.buyProducts);
router.get('/get-orders/:walletAddress', ecommerceController.getOrdersByUser);
router.post('/claim-warranty', ecommerceController.claimWarranty);
router.get('/warranty-info/:walletAddress/:productID', ecommerceController.getWarrantyInfo);

export default router;

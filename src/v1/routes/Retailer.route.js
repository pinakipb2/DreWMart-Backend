import express from 'express';
import { retailerController } from '../controllers';

const router = express.Router();

router.post('/add-retailer', retailerController.addRetailer);
router.get('/all-retailers', retailerController.getAll);
router.post('/login', retailerController.loginRetailer);
router.post('/inventory', retailerController.getInventoryByRetailer);
router.post('/get-sold-products', retailerController.getSoldProdsByRetailer);
router.post('/sell-product', retailerController.sellProductToUser);

export default router;

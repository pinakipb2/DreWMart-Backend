import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

router.get('/all-products', productController.getAllProducts);
router.get('/single-product/:id', productController.getSingleProduct);

export default router;

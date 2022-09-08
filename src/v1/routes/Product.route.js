import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

router.get('/all-products', productController.getAllProducts);

export default router;

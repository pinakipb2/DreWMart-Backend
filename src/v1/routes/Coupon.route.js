import express from 'express';
import { couponController } from '../controllers';

const router = express.Router();

router.get('/all-coupons', couponController.getAllCoupons);
router.post('/redeem-coupon', couponController.redeemCoupon);
router.get('/get-coupons/:retailerId', couponController.getCouponsByRetailer);

export default router;

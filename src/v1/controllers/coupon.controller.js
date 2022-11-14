import createError from 'http-errors';
import { prisma } from '../../prisma';
import Joi from 'joi';
import { userSchema } from '../validators';

const couponController = {
  async getAllCoupons(req, res, next) {
    try {
      const allCoupons = await prisma.couponItems.findMany({});
      res.send(allCoupons);
    } catch (err) {
      console.log(err);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async redeemCoupon(req, res, next) {
    try {
      const redeemSchema = Joi.object({
        retailerId: Joi.string().trim().min(20).max(30).required(),
        couponItemsId: Joi.string().trim().min(20).max(30).required(),
      });
      const result = await redeemSchema.validateAsync(req.body);
      const { retailerId, couponItemsId } = result;
      const addedCoupon = await prisma.retailerCoupons.create({
        data: {
          retailerId,
          couponItemsId,
        },
      });
      res.send(addedCoupon);
    } catch (err) {
      console.log(err);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getCouponsByRetailer(req, res, next) {
    try {
      const couponSchema = Joi.object({
        retailerId: Joi.string().trim().min(20).max(30).required(),
      });
      const result = await couponSchema.validateAsync(req.params);
      const { retailerId } = result;
      const allCoupons = await prisma.retailerCoupons.findMany({
        where: {
          retailerId,
        },
        include: {
          CouponItem: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.send(allCoupons);
    } catch (err) {
      console.log(err);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default couponController;

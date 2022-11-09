import createError from 'http-errors';
import { prisma } from '../../prisma';
import { ecommerceSchema, userSchema } from '../validators';
import { productDTO } from '../dtos';
import Joi from 'joi';
import ProductIdService from '../services/ProductIdService';
// import axios from 'axios';

const ecommerceController = {
  async buyProducts(req, res, next) {
    try {
      const result = await ecommerceSchema.validateAsync(req.body);
      const { walletAddress, cart } = result;
      let productArray = [];
      // Check all productId in cart exists in table
      for (let i = 0; i < cart.length; i++) {
        await prisma.product.findFirstOrThrow({
          where: {
            id: cart[i].productId,
          },
        });
      }
      for (let i = 0; i < cart.length; i++) {
        const myArr = [];
        for (let j = 0; j < cart[i].quantity; j++) {
          const obj = {
            prodId: ProductIdService.generateProductID(),
            productId: cart[i].productId,
            soldTo: walletAddress,
            soldAt: new Date(),
          };
          myArr.push(obj);
        }
        productArray = productArray.concat(myArr);
      }
      const { count } = await prisma.store.createMany({
        data: productArray,
      });
      const totProds = cart.reduce((accumulator, prod) => {
        return accumulator + prod.quantity;
      }, 0);
      if (count !== totProds) {
        throw new Error('Number of Products differ in allocation');
      }
      res.send(productArray);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getOrdersByUser(req, res, next) {
    try {
      const result = await userSchema.validateAsync(req.params);
      const { walletAddress } = result;
      const allOrders = await prisma.store.findMany({
        where: {
          soldTo: walletAddress,
        },
        include: {
          Product: true,
          Retailer: true,
        },
        orderBy: [
          {
            soldAt: 'desc',
          },
        ],
      });
      const orders = allOrders.map((order) => {
        order.Product = new productDTO(order.Product);
        if (order.Retailer) {
          order.Retailer.drewTokens = order.Retailer.drewTokens.toString();
        }
        return order;
      });
      res.json(orders);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async claimWarranty(req, res, next) {
    const warrantySchema = Joi.object({
      id: Joi.string().trim().min(20).max(30).required(),
      walletAddress: Joi.string().trim().min(35).max(50).required(),
    });
    try {
      const result = await warrantySchema.validateAsync(req.body);
      const { id, walletAddress } = result;
      await prisma.store.findFirstOrThrow({
        where: {
          id,
          soldTo: walletAddress,
        },
      });
      const product = await prisma.store.update({
        where: {
          id,
        },
        data: {
          isWarrantyClaimed: true,
        },
      });
      // Run webhook to revalidate page
      // try {
      //   await axios.get(`${process.env.FRONTEND_URL}/api/revalidate?warrantyId=${id}`);
      // } catch (err) {
      //   console.log('Could not Revalidate Page');
      // }
      res.json(product);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getWarrantyInfo(req, res, next) {
    const warrantySchema = Joi.object({
      productID: Joi.string().trim().min(20).max(30).required(),
      walletAddress: Joi.string().trim().min(35).max(50).required(),
    });
    try {
      const result = await warrantySchema.validateAsync(req.params);
      const { productID, walletAddress } = result;
      const product = await prisma.store.findFirstOrThrow({
        where: {
          id: productID,
          soldTo: walletAddress,
        },
        include: {
          Product: true,
          Retailer: true,
        },
      });
      if (!product.isWarrantyClaimed) {
        throw new Error('Warranty not Claimed');
      }
      product.Product = new productDTO(product.Product);
      res.json(product);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default ecommerceController;

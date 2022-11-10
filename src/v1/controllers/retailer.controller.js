import createError from 'http-errors';
import { prisma } from '../../prisma';
import { retailerSchema } from '../validators';
import ProductIdService from '../services/ProductIdService';

const ASSIGN_NO_OF_PRODUCTS_TO_RETAILER = 5;

const retailerController = {
  async addRetailer(req, res, next) {
    try {
      const result = await retailerSchema.validateAsync(req.body);
      const { name, walletAddress } = result;
      const retailerExists = await prisma.retailer.findUnique({
        where: {
          walletAddress,
        },
      });
      if (retailerExists !== null) {
        return next(createError.Conflict('Retailer Already Exists'));
      }
      const retailer = await prisma.retailer.create({
        data: {
          name,
          walletAddress,
        },
      });
      const products = await prisma.product.findMany({});
      if (products.length < 1) {
        // Delete the current Retailer
        await prisma.retailer.delete({
          where: {
            id: retailer.id,
          },
        });
        throw new Error('No Product found');
      }
      const arr = [];
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < ASSIGN_NO_OF_PRODUCTS_TO_RETAILER; j++) {
          const obj = {
            prodId: ProductIdService.generateProductID(),
            productId: products[i].id,
            retailerId: retailer.id,
          };
          arr.push(obj);
        }
      }
      // console.log(arr);
      const { count } = await prisma.store.createMany({
        data: arr,
      });
      console.log('Count : ' + count);
      if (count !== products.length * ASSIGN_NO_OF_PRODUCTS_TO_RETAILER) {
        // Delete the current Retailer
        await prisma.retailer.delete({
          where: {
            id: retailer.id,
          },
        });
        throw new Error('Number of Products differ in allocation');
      }
      res.send(retailer);
    } catch (err) {
      console.log(err);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getAll(req, res, next) {
    try {
      const allRetailers = await prisma.retailer.findMany({});
      res.send(allRetailers);
    } catch (err) {
      console.log(err);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default retailerController;

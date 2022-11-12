import createError from 'http-errors';
import { prisma } from '../../prisma';
import { retailerSchema, userSchema } from '../validators';
import ProductIdService from '../services/ProductIdService';
import Joi from 'joi';

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
  async loginRetailer(req, res, next) {
    try {
      const result = await userSchema.validateAsync(req.body);
      const { walletAddress } = result;
      const retailer = await prisma.retailer.findUniqueOrThrow({
        where: {
          walletAddress,
        },
      });
      res.send(retailer);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getInventoryByRetailer(req, res, next) {
    try {
      const result = await userSchema.validateAsync(req.body);
      const { walletAddress } = result;
      const groupItems = await prisma.store.groupBy({
        by: ['productId'],
        where: {
          AND: [
            { soldTo: null },
            {
              Retailer: {
                walletAddress: walletAddress,
              },
            },
          ],
        },
        _count: {
          productId: true,
        },
      });
      const promises = groupItems.map(async (item) => {
        const prod = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
        });
        return { id: item.productId, name: prod.name, quantity: item._count.productId };
      });
      const inventory = await Promise.all(promises);
      res.send(inventory);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getSoldProdsByRetailer(req, res, next) {
    try {
      const result = await userSchema.validateAsync(req.body);
      const { walletAddress } = result;
      const soldProducts = await prisma.store.findMany({
        where: {
          AND: [
            {
              soldTo: {
                not: null,
              },
            },
            {
              Retailer: {
                walletAddress,
              },
            },
          ],
        },
        orderBy: {
          soldAt: 'desc',
        },
        include: {
          Product: true,
        },
      });
      res.send(soldProducts);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async sellProductToUser(req, res, next) {
    const sellSchema = Joi.object({
      id: Joi.string().trim().min(20).max(30).required(),
      soldTo: Joi.string().lowercase().trim().min(35).max(50).required(),
      walletAddress: Joi.string().lowercase().trim().min(35).max(50).required(),
    });
    try {
      const result = await sellSchema.validateAsync(req.body);
      const { id, soldTo, walletAddress } = result;
      const toSoldItem = await prisma.store.findFirstOrThrow({
        where: {
          AND: [
            {
              soldTo: null,
            },
            {
              Retailer: {
                walletAddress,
              },
            },
            {
              productId: id,
            },
          ],
        },
      });
      const randomReward = Math.floor(Math.random() * 29);
      const { drewTokens } = await prisma.retailer.update({
        where: {
          walletAddress,
        },
        data: {
          drewTokens: {
            increment: randomReward,
          },
        },
      });
      const soldItem = await prisma.store.update({
        where: {
          id: toSoldItem.id,
        },
        data: {
          soldTo,
          soldAt: new Date(),
        },
      });
      res.json({ soldItem, drewTokens });
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default retailerController;

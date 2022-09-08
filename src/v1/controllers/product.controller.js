import createError from 'http-errors';
import { prisma } from '../../prisma';

const productController = {
  async getAllProducts(req, res, next) {
    try {
      const allProducts = await prisma.product.findMany({});
      res.send({ data: allProducts });
    } catch (err) {
      return next(createError.InternalServerError());
    }
  },
};

export default productController;

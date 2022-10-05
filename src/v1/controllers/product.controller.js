import createError from 'http-errors';
import { prisma } from '../../prisma';
import { productDTO } from '../dtos';

const productController = {
  async getAllProducts(req, res, next) {
    try {
      const products = await prisma.product.findMany({});
      const allProducts = await Promise.all(
        products.map((product) => {
          return new productDTO(product);
        })
      );
      res.send(allProducts);
    } catch (err) {
      return next(createError.InternalServerError());
    }
  },
  async getSingleProduct(req, res, next) {
    try {
      const product = await prisma.product.findUniqueOrThrow({
        where: {
          id: req.params.id.toString().trim(),
        },
      });
      res.send(new productDTO(product));
    } catch (err) {
      return next(createError.InternalServerError());
    }
  },
};

export default productController;

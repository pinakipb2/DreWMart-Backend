import createError from 'http-errors';
import { prisma } from '../../prisma';
import { ecommerceSchema } from '../validators';
import { v4 as uuidv4 } from 'uuid';
import cuid from 'cuid';

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
          const baseId = uuidv4().split('-');
          const obj = {
            prodId: baseId[0] + '-' + baseId[1] + '-' + cuid(),
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
      const totProds = cart.reduce((a, b) => {
        return a.quantity + b.quantity;
      });
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
};

export default ecommerceController;

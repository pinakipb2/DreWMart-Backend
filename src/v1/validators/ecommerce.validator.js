import Joi from 'joi';

const ecommerceSchema = Joi.object({
  walletAddress: Joi.string().trim().min(6).max(41).required(),
  cart: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().trim().required(),
        quantity: Joi.number().min(1).max(10).required(),
      })
    )
    .unique('productId')
    .min(1)
    .required(),
});

export default ecommerceSchema;

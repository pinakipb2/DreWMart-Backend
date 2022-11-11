import Joi from 'joi';

const ecommerceSchema = Joi.object({
  walletAddress: Joi.string().lowercase().trim().min(35).max(50).required(),
  cart: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().trim().min(20).max(30).required(),
        quantity: Joi.number().min(1).max(10).required(),
      })
    )
    .unique('productId')
    .min(1)
    .required(),
});

export default ecommerceSchema;

import Joi from 'joi';

const retailerSchema = Joi.object({
  name: Joi.string().trim().required(),
  walletAddress: Joi.string().trim().min(6).max(41).required(),
});

export default retailerSchema;

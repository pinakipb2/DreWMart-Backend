import Joi from 'joi';

const retailerSchema = Joi.object({
  name: Joi.string().trim().required(),
  walletAddress: Joi.string().lowercase().trim().min(35).max(50).required(),
});

export default retailerSchema;

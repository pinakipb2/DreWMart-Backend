import Joi from 'joi';

const userSchema = Joi.object({
  walletAddress: Joi.string().trim().min(35).max(50).required(),
});

export default userSchema;

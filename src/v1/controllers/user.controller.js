import createError from 'http-errors';
import { prisma } from '../../prisma';
import { Prisma } from '@prisma/client';
import Joi from 'joi';

const userController = {
  async registerUser(req, res, next) {
    const userSchema = Joi.object({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      emailId: Joi.string().trim().required(),
      phoneNumber: Joi.string().trim().required(),
      address: Joi.string().trim().required(),
      walletAddress: Joi.string().lowercase().trim().min(35).max(50).required(),
    });
    try {
      const result = await userSchema.validateAsync(req.body);
      const { firstName, lastName, emailId, phoneNumber, address, walletAddress } = result;
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          emailId,
          phoneNumber,
          address,
          walletAddress,
        },
      });
      res.send(user);
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return next(createError.Conflict('User Already Exists'));
        }
      }
      return next(createError.InternalServerError());
    }
  },
  async loginUser(req, res, next) {
    const userSchema = Joi.object({
      emailId: Joi.string().trim().required(),
      walletAddress: Joi.string().lowercase().trim().min(35).max(50).required(),
    });
    try {
      const result = await userSchema.validateAsync(req.body);
      const { emailId, walletAddress } = result;
      const user = await prisma.user.findMany({
        where: {
          AND: [
            {
              emailId: {
                equals: emailId,
              },
            },
            {
              walletAddress: {
                equals: walletAddress,
              },
            },
          ],
        },
      });
      console.log(user);
      if (user.length === 0) {
        return next(createError.InternalServerError('Check Credentials'));
      }
      res.send(user[0]);
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default userController;

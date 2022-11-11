import createError from 'http-errors';
import { prisma } from '../../prisma';
import Joi from 'joi';
import { userSchema } from '../validators';

const adminController = {
  async addAdmin(req, res, next) {
    try {
      const adminSchema = Joi.object({
        name: Joi.string().trim().required(),
        walletAddress: Joi.string().lowercase().trim().min(35).max(50).required(),
      });
      const result = await adminSchema.validateAsync(req.body);
      const { name, walletAddress } = result;
      try {
        const owner = await prisma.admin.create({
          data: {
            name,
            walletAddress,
          },
        });
        res.send(owner);
      } catch (err) {
        return next(createError.Conflict('Owner Already Exists'));
      }
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async loginAdmin(req, res, next) {
    try {
      const result = await userSchema.validateAsync(req.body);
      const { walletAddress } = result;
      const admin = await prisma.admin.findUniqueOrThrow({
        where: {
          walletAddress,
        },
      });
      res.send(admin);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
  async getAll(req, res, next) {
    try {
      const allAdmins = await prisma.admin.findMany({});
      res.send(allAdmins);
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.mesasge));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default adminController;

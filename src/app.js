import express from 'express';
import './v1/config/env.config';
import cors from 'cors';
import createError from 'http-errors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import xss from 'xss-clean';
import path from 'path';

import { productRoutes, retailerRoutes, ecommerceRoutes, userRoutes, adminRoutes, couponRoutes } from './v1/routes';
import { clientAuth } from './v1/middlewares';

// RateLimitter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: 'Too Many Requests',
  },
});

const corsOption = {
  origin: [process.env.FRONTEND_URL, 'http://localhost:3001'],
};

const app = express();

// Global variable appRoot with base dirname
global.appRoot = path.resolve(__dirname);

// Middlewares
app.use(helmet());
app.set('trust proxy', 1);
app.use(limiter);
app.use(xss());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/images', express.static('images'));
app.use(clientAuth);

// Welcome Route
app.all('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 😎' });
});

const apiVersion = 'v1';

// Routes
app.use(`/api/${apiVersion}/product`, productRoutes);
app.use(`/api/${apiVersion}/retailer`, retailerRoutes);
app.use(`/api/${apiVersion}/ecommerce`, ecommerceRoutes);
app.use(`/api/${apiVersion}/user`, userRoutes);
app.use(`/api/${apiVersion}/admin`, adminRoutes);
app.use(`/api/${apiVersion}/coupon`, couponRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Server Configs
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
});

import createError from 'http-errors';
import JwtService from '../services/JwtService';

const clientAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError.Unauthorized());
  }
  /* 0th index is "Bearer" and 1st index is the " JWT Token" */
  const token = authHeader.split(' ')[1];
  console.log(token);
  // This will come from nextJS as token
  const tok = await JwtService.sign({ origin: 'DreWMart FrontEnd' }, '5s', 'supersecret');
  try {
    // Check if token is valid
    const { origin } = await JwtService.verify(tok, 'supersecret');
    if (origin !== 'DreWMart FrontEnd') {
      throw new Error('Malformed JWT');
    }
    next();
  } catch (err) {
    return next(createError.Unauthorized());
  }
};

export default clientAuth;

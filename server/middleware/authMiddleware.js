import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  const cookieName = process.env.COOKIE_NAME || 'projx_token';

  // 1. Try reading token from HTTP-only cookie
  if (req.cookies && req.cookies[cookieName]) {
    token = req.cookies[cookieName];
  }
  // 2. Fallback to Authorization Bearer header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no session token provided',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'projx_super_secret_jwt_key_2026_secure';
    const decoded = jwt.verify(token, secret);

    // Always fetch latest user from DB to verify role and status
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[Auth Middleware Error]:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed or expired',
    });
  }
};

export default protect;

import jwt from 'jsonwebtoken';

export const generateToken = (res, userId, role) => {
  const secret = process.env.JWT_SECRET || 'projx_super_secret_jwt_key_2026_secure';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  const token = jwt.sign({ id: userId, role }, secret, {
    expiresIn,
  });

  const cookieName = process.env.COOKIE_NAME || 'projx_token';
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: isProduction, // true in production
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export const clearToken = (res) => {
  const cookieName = process.env.COOKIE_NAME || 'projx_token';
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie(cookieName, '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(0),
  });
};

export default generateToken;

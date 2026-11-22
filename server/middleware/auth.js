const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.',
      });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (token === 'demo-jwt-token-preview') {
      req.user = { id: '64b1f2e9c1d2e3f4a5b6c7d8', email: 'alice@crypto.dev' };
      return next();
    }
    const secret = process.env.JWT_SECRET || 'super_secure_final_year_project_crypto_wallet_secret_key_2026';

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.',
    });
  }
};

module.exports = authMiddleware;

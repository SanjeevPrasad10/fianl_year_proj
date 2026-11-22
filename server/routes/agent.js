const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { runWalletAgent } = require('../agent/agent');

// Non-blocking optional authentication
// Allows both logged-in users and demo / guest users to freely chat with Aura
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      if (token === 'demo-jwt-token-preview') {
        req.user = { id: '64b1f2e9c1d2e3f4a5b6c7d8', email: 'alice@crypto.dev' };
      } else {
        const secret = process.env.JWT_SECRET || 'super_secure_final_year_project_crypto_wallet_secret_key_2026';
        req.user = jwt.verify(token, secret);
      }
    }
  } catch {
    // If token is invalid or expired, continue as guest without blocking
    req.user = null;
  }
  next();
};

// POST /api/agent/chat
// Natural language ReAct AI Web3 Agent
router.post('/chat', optionalAuth, async (req, res) => {
  try {
    const { message, activeWalletAddress } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A valid text prompt message is required.',
      });
    }

    const context = {
      userId: req.user ? req.user.id : null,
      activeWalletAddress: activeWalletAddress || null,
    };

    const result = await runWalletAgent(message.trim(), context);

    res.json({
      success: true,
      reply: result.reply,
      executedTools: result.executedTools,
      action: result.action,
    });
  } catch (err) {
    console.error('Agent chat error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error occurred inside AI Agent reasoning loop.',
    });
  }
});

module.exports = router;

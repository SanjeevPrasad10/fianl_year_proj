const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { runWalletAgent } = require('../agent/agent');

// POST /api/agent/chat
// Natural language ReAct AI Web3 Agent
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, activeWalletAddress } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A valid text prompt message is required.',
      });
    }

    const context = {
      userId: req.user.id,
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

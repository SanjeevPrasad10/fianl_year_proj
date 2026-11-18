const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// @route   POST /api/transactions
// @desc    Record a completed blockchain transaction
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { txHash, from, to, amount, asset, network, status } = req.body;

    if (!txHash || !from || !to || !amount) {
      return res.status(400).json({
        success: false,
        message: 'txHash, from, to, and amount are required.',
      });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      txHash: txHash.trim(),
      from: from.toLowerCase().trim(),
      to: to.toLowerCase().trim(),
      amount: String(amount),
      asset: (asset || 'ETH').toUpperCase(),
      network: network || 'sepolia',
      status: status || 'confirmed',
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction recorded successfully.',
      transaction,
    });
  } catch (err) {
    console.error('Save transaction error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to record transaction.',
      error: err.message,
    });
  }
});

// @route   GET /api/transactions
// @desc    Get transaction history for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { asset, limit = 50 } = req.query;
    const filter = { userId: req.user.id };

    if (asset && asset !== 'ALL') {
      filter.asset = asset.toUpperCase();
    }

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (err) {
    console.error('Fetch transactions error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history.',
      error: err.message,
    });
  }
});

module.exports = router;

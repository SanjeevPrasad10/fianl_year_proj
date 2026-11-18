const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   PUT /api/wallet
// @desc    Save public address and encrypted keystore backup
// @access  Private
// @security Server stores ONLY the browser-encrypted JSON keystore;
//           private key and password never touch the server.
router.put('/', auth, async (req, res) => {
  try {
    const { walletAddress, encryptedKeystore } = req.body;

    if (!walletAddress || !encryptedKeystore) {
      return res.status(400).json({
        success: false,
        message: 'walletAddress and encryptedKeystore are required.',
      });
    }

    // Basic Ethereum address format check
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Ethereum wallet address format.',
      });
    }

    // Ensure encryptedKeystore is valid JSON
    let keystoreString = encryptedKeystore;
    if (typeof encryptedKeystore === 'object') {
      keystoreString = JSON.stringify(encryptedKeystore);
    }

    try {
      JSON.parse(keystoreString);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'encryptedKeystore must be valid JSON.',
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.walletAddress = walletAddress.toLowerCase();
    user.encryptedKeystore = keystoreString;
    await user.save();

    res.json({
      success: true,
      message: 'Wallet backup saved successfully.',
      wallet: {
        address: user.walletAddress,
        hasBackup: true,
      },
    });
  } catch (err) {
    console.error('Wallet backup error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to save wallet backup.',
      error: err.message,
    });
  }
});

// @route   GET /api/wallet
// @desc    Fetch encrypted keystore backup to restore wallet on new device/browser
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('walletAddress encryptedKeystore');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (!user.encryptedKeystore) {
      return res.status(404).json({
        success: false,
        message: 'No encrypted wallet backup found for this account.',
      });
    }

    res.json({
      success: true,
      wallet: {
        address: user.walletAddress,
        encryptedKeystore: user.encryptedKeystore,
      },
    });
  } catch (err) {
    console.error('Wallet fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wallet backup.',
      error: err.message,
    });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  txHash: {
    type: String,
    required: [true, 'Transaction hash is required'],
    trim: true,
  },
  from: {
    type: String,
    required: [true, 'Sender address is required'],
    trim: true,
  },
  to: {
    type: String,
    required: [true, 'Recipient address is required'],
    trim: true,
  },
  amount: {
    type: String,
    required: [true, 'Amount is required'],
  },
  asset: {
    type: String,
    required: true,
    default: 'ETH',
    trim: true,
  },
  network: {
    type: String,
    default: 'sepolia',
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);

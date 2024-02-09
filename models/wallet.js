const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  wallet_id: {
    type: Number,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true
  },
  wallet_user: {
    user_id: {
      type: Number,
      required: true
    },
    user_name: {
      type: String,
      required: true
    }
  }
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

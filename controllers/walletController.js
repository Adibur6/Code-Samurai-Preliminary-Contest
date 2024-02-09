// Import the Wallet model
const Wallet = require('../models/wallet');

// Function to get wallet by ID
exports.getWallet = async (req, res) => {
  try {
    const curWallet = await Wallet.findOne({ wallet_id: req.params.wallet_id });

    if (!curWallet) {
      return res.status(404).json({ message: `wallet with id: ${req.params.wallet_id} was not found` });
    }

    const responseWallet = mapWalletToResponse(curWallet);

    res.json(responseWallet);


  } catch (err) {
    // Handle errors
    return res.status(500).json({ message: err.message });
  }
};


const mapWalletToResponse = (wallet) => {
    return {
      wallet_id: wallet.wallet_id,
      wallet_balance: wallet.balance,
      wallet_user: {
        user_id: wallet.wallet_user.user_id,
        user_name: wallet.wallet_user.user_name
      }
    };
  };
  


// Function to add funds to the wallet
exports.addWalletBalance = async (req, res) => {
  try {
    // Find the wallet by ID
    const curWallet = await Wallet.findOne({ wallet_id: req.params.wallet_id });

    // Check if wallet exists
    if (!curWallet) {
      return res.status(404).json({ message: `wallet with id: ${req.params.wallet_id} was not found` });
    }

    // Get the recharge amount from the request body
    const rechargeAmount = req.body.recharge;

    // Check if recharge amount is within the valid range
    if (rechargeAmount < 100 || rechargeAmount > 10000) {
      return res.status(400).json({ message: `invalid amount: ${rechargeAmount}` });
    }

    // Update the wallet balance
    curWallet.balance += rechargeAmount;

    // Save the updated wallet to the database
    const updatedWallet = await curWallet.save();

    // Respond with the updated wallet object and 200 status
    res.status(200).json({
      wallet_id: updatedWallet.wallet_id,
      balance: updatedWallet.balance,
      wallet_user: updatedWallet.wallet_user
    });

  } catch (err) {
    // Handle errors
    return res.status(500).json({ message: err.message });
  }
};

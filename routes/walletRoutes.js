const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Define route for getting wallet balance by ID
router.get('/:wallet_id', walletController.getWallet);
router.put('/:wallet_id', walletController.addWalletBalance);


module.exports = router;

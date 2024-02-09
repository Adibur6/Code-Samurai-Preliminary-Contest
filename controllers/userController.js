const User = require('../models/user');
const Wallet = require('../models/wallet');

exports.addUser = async (req, res) => {
  try {
    // Create a new user object
    const newUser = new User({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      balance: req.body.balance
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Create a new wallet object associated with the user
    const newWallet = new Wallet({
      wallet_id: savedUser.user_id, // Assigning user_id as wallet_id
      balance: savedUser.balance, // Assigning user's balance as wallet balance
      wallet_user: { user_id: savedUser.user_id, user_name: savedUser.user_name }
    });

    // Save the new wallet to the database
    await newWallet.save();

    // Respond with the saved user and wallet objects
    const responseUser =  mapUserToResponse(savedUser);

    // Respond with the saved user object and 201 status
    res.status(201).json(responseUser);
    
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const mapUserToResponse = (user) => {
  return {
    user_id: user.user_id,
    user_name: user.user_name,
    balance: user.balance
  };
};

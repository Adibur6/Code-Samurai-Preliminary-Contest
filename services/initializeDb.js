const mongoose = require('mongoose');
const Train = require('../models/Train');
const Station = require('../models/Station');
const User = require('../models/user');
const Wallet = require('../models/wallet');

async function initializeDb() {
    try {
        // Clear existing data
        await Train.deleteMany({});
        await Station.deleteMany({});
        await User.deleteMany({});
        await Wallet.deleteMany({});

        console.log('Database initialized. Cleared all existing data.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

module.exports = initializeDb;

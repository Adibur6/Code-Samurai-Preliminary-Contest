const mongoose = require('mongoose');
const Book = require('../models/book');

async function initializeDb() {
    try {
      // Clear the database
      await Book.deleteMany({});
      console.log('Database initialized. Cleared all data.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
  

module.exports = initializeDb;

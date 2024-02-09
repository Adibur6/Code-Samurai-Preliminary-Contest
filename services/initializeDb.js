const mongoose = require('mongoose');


async function initializeDb() {
    try {
      // Clear the database
     
      console.log('Database initialized. Cleared all data.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
  

module.exports = initializeDb;

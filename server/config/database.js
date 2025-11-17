const { Sequelize } = require('sequelize');

// Using SQLite for testing
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Set to console.log for debugging
});

module.exports = sequelize;
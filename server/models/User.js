const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming config/database.js exists

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('online', 'idle', 'dnd', 'invisible'),
    defaultValue: 'online',
  },
}, {
  timestamps: true,
});

module.exports = User;
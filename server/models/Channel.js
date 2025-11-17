const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  server_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Servers',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('text', 'voice'),
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
}, {
  timestamps: true,
});

module.exports = Channel;
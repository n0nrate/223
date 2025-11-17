const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Assuming this exists

// Import models
const User = require('./User');
const Server = require('./Server');
const Channel = require('./Channel');
const Role = require('./Role');

// Define associations
User.hasMany(Server, { foreignKey: 'owner_id', as: 'ownedServers' });
Server.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

Server.hasMany(Channel, { foreignKey: 'server_id', as: 'channels' });
Channel.belongsTo(Server, { foreignKey: 'server_id', as: 'server' });

Server.hasMany(Role, { foreignKey: 'server_id', as: 'roles' });
Role.belongsTo(Server, { foreignKey: 'server_id', as: 'server' });

// For server members, if needed later, add junction table
// User.belongsToMany(Server, { through: 'ServerMembers', foreignKey: 'user_id' });
// Server.belongsToMany(User, { through: 'ServerMembers', foreignKey: 'server_id' });

// Export models
module.exports = {
  sequelize,
  User,
  Server,
  Channel,
  Role,
};
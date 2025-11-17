const { Server, User } = require('../models');
const { body, validationResult } = require('express-validator');

const getUserServers = async (req, res) => {
  try {
    const servers = await Server.findAll({
      where: { owner_id: req.user.id },
      include: [{ model: User, as: 'owner', attributes: ['id', 'username'] }]
    });
    res.json(servers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch servers' });
  }
};

const createServer = [
  body('name').isLength({ min: 1 }).withMessage('Server name is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, is_public } = req.body;

    try {
      const server = await Server.create({
        name,
        owner_id: req.user.id,
        description,
        is_public: is_public || false,
      });
      res.status(201).json(server);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create server' });
    }
  }
];

const getServer = async (req, res) => {
  try {
    const server = await Server.findByPk(req.params.id, {
      include: [{ model: User, as: 'owner', attributes: ['id', 'username'] }]
    });
    if (!server) {
      return res.status(404).json({ error: 'Server not found' });
    }
    res.json(server);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch server' });
  }
};

const updateServer = [
  body('name').optional().isLength({ min: 1 }).withMessage('Server name cannot be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const server = await Server.findByPk(req.params.id);
      if (!server) {
        return res.status(404).json({ error: 'Server not found' });
      }
      if (server.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const { name, description, is_public } = req.body;
      await server.update({ name, description, is_public });
      res.json(server);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update server' });
    }
  }
];

const deleteServer = async (req, res) => {
  try {
    const server = await Server.findByPk(req.params.id);
    if (!server) {
      return res.status(404).json({ error: 'Server not found' });
    }
    if (server.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await server.destroy();
    res.json({ message: 'Server deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete server' });
  }
};

const joinServer = async (req, res) => {
  // Placeholder for join logic - requires ServerMember model
  res.status(501).json({ error: 'Join server not implemented yet' });
};

const leaveServer = async (req, res) => {
  // Placeholder for leave logic
  res.status(501).json({ error: 'Leave server not implemented yet' });
};

module.exports = { getUserServers, createServer, getServer, updateServer, deleteServer, joinServer, leaveServer };
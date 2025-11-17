const { Channel, Server } = require('../models');
const { body, validationResult } = require('express-validator');

const getServerChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll({
      where: { server_id: req.params.serverId },
      order: [['position', 'ASC']]
    });
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
};

const createChannel = [
  body('name').isLength({ min: 1 }).withMessage('Channel name is required'),
  body('type').isIn(['text', 'voice']).withMessage('Type must be text or voice'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, position } = req.body;
    const serverId = req.params.serverId;

    try {
      // Check if server exists and user is owner (basic check)
      const server = await Server.findByPk(serverId);
      if (!server) {
        return res.status(404).json({ error: 'Server not found' });
      }
      if (server.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const channel = await Channel.create({
        server_id: serverId,
        name,
        type,
        position: position || 0,
      });
      res.status(201).json(channel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create channel' });
    }
  }
];

const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findByPk(req.params.id, {
      include: [{ model: Server, as: 'server' }]
    });
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch channel' });
  }
};

const updateChannel = [
  body('name').optional().isLength({ min: 1 }).withMessage('Channel name cannot be empty'),
  body('type').optional().isIn(['text', 'voice']).withMessage('Type must be text or voice'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const channel = await Channel.findByPk(req.params.id, {
        include: [{ model: Server, as: 'server' }]
      });
      if (!channel) {
        return res.status(404).json({ error: 'Channel not found' });
      }
      if (channel.server.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const { name, type, position } = req.body;
      await channel.update({ name, type, position });
      res.json(channel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update channel' });
    }
  }
];

const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByPk(req.params.id, {
      include: [{ model: Server, as: 'server' }]
    });
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    if (channel.server.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await channel.destroy();
    res.json({ message: 'Channel deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete channel' });
  }
};

module.exports = { getServerChannels, createChannel, getChannel, updateChannel, deleteChannel };
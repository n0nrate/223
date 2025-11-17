const Message = require('../models/Message');
const { body, validationResult } = require('express-validator');

const getChannelMessages = async (req, res) => {
  const { channelId } = req.params;
  const { limit = 50, before } = req.query;

  try {
    const query = { channel_id: channelId };
    if (before) {
      query.timestamp = { $lt: new Date(before) };
    }

    const messages = await Message.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json(messages.reverse()); // Reverse to get chronological order
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const sendMessage = [
  body('content').isLength({ min: 1 }).withMessage('Message content is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { channelId } = req.params;
    const { content, attachments } = req.body;

    try {
      const message = new Message({
        id: require('crypto').randomUUID(), // Generate UUID
        channel_id: channelId,
        user_id: req.user.id,
        content,
        attachments: attachments || [],
      });

      await message.save();
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
];

const editMessage = [
  body('content').isLength({ min: 1 }).withMessage('Message content is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { content } = req.body;

    try {
      const message = await Message.findOne({ id });
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      if (message.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      message.content = content;
      message.edited_at = new Date();
      await message.save();
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit message' });
    }
  }
];

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findOne({ id });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    if (message.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Message.deleteOne({ id });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = { getChannelMessages, sendMessage, editMessage, deleteMessage };
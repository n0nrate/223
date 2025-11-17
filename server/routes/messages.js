const express = require('express');
const { getChannelMessages, sendMessage, editMessage, deleteMessage } = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// Routes for channel messages
router.get('/channels/:channelId/messages', getChannelMessages);
router.post('/channels/:channelId/messages', sendMessage);

// Routes for individual messages
router.put('/:id', editMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
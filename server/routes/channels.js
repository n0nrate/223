const express = require('express');
const { getServerChannels, createChannel, getChannel, updateChannel, deleteChannel } = require('../controllers/channelController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// Routes for server-scoped channels
router.get('/servers/:serverId/channels', getServerChannels);
router.post('/servers/:serverId/channels', createChannel);

// Routes for individual channels
router.get('/:id', getChannel);
router.put('/:id', updateChannel);
router.delete('/:id', deleteChannel);

module.exports = router;
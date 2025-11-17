const express = require('express');
const { getUserServers, createServer, getServer, updateServer, deleteServer, joinServer, leaveServer } = require('../controllers/serverController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getUserServers);
router.post('/', createServer);
router.get('/:id', getServer);
router.put('/:id', updateServer);
router.delete('/:id', deleteServer);
router.post('/:id/join', joinServer);
router.post('/:id/leave', leaveServer);

module.exports = router;
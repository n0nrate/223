const express = require('express');
const { getCurrentUser, updateProfile, getUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/me', getCurrentUser);
router.put('/me', updateProfile);
router.get('/:id', getUser);

module.exports = router;
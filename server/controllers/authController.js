const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { User } = require('../models');

const register = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
      if (existingUser) {
        return res.status(409).json({ error: 'Username or email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password_hash: hashedPassword,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

      res.status(201).json({ user: { id: user.id, username: user.username, email: user.email }, token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
];

const login = [
  body('username').isLength({ min: 3 }).withMessage('Username is required'),
  body('password').exists().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

      res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
];

const logout = (req, res) => {
  // For stateless JWT, logout is handled client-side by removing the token
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
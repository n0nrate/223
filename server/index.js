const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const { sequelize } = require('./models');
const connectMongoDB = require('./config/mongodb');
const authRoutes = require('./routes/auth');
const serverRoutes = require('./routes/servers');
const channelRoutes = require('./routes/channels');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const Message = require('./models/Message');
const { User } = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/servers', serverRoutes);
app.use('/channels', channelRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use(errorHandler);

// Socket.io middleware for authentication
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new Error('Authentication error'));
    }
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.user.id);

  socket.on('join_channel', (channelId) => {
    socket.join(channelId);
    console.log(`User ${socket.user.id} joined channel ${channelId}`);
  });

  socket.on('leave_channel', (channelId) => {
    socket.leave(channelId);
    console.log(`User ${socket.user.id} left channel ${channelId}`);
  });

  socket.on('send_message', async (data) => {
    const { channelId, content } = data;
    try {
      const message = new Message({
        id: require('crypto').randomUUID(),
        channel_id: channelId,
        user_id: socket.user.id,
        content,
        timestamp: new Date(),
      });
      await message.save();
      io.to(channelId).emit('new_message', {
        id: message.id,
        channel_id: message.channel_id,
        user_id: message.user_id,
        content: message.content,
        timestamp: message.timestamp,
      });
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', 'Failed to send message');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.id);
  });
});

// Connect to databases and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite connected');
    await sequelize.sync(); // Sync models

    // await connectMongoDB(); // Commented out for testing

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
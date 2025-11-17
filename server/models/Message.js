const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  channel_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  edited_at: {
    type: Date,
    required: false,
  },
  attachments: [{
    type: Object,
  }],
  reactions: [{
    type: Object,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
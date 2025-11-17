const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  message_id: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
  },
  file_size: {
    type: Number,
    required: true,
  },
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Attachment', attachmentSchema);
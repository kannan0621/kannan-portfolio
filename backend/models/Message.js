const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  emailSent: { type: Boolean, default: false },
  emailAdminId: { type: String, default: null },
  emailUserId: { type: String, default: null }
});

module.exports = mongoose.model('Message', MessageSchema);

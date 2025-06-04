const mongoose = require('mongoose');

const scheduledMessageSchema = new mongoose.Schema({
  message: String,
  scheduledAt: Date,
  filePath: String
});

module.exports = mongoose.model('ScheduledMessage', scheduledMessageSchema);

const fs = require('fs');
const path = require('path');

exports.scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;
    if (!message || !day || !time) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const scheduledDate = new Date(`${day}T${time}:00`);
    if (isNaN(scheduledDate)) {
      return res.status(400).json({ message: 'Invalid day or time format' });
    }
    const messagesDir = path.join(__dirname, '../../node_api/messages');
 
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    const filePath = path.join(messagesDir, `${Date.now()}.txt`);

    fs.writeFileSync(filePath, message);

    const ScheduledMessage = require('../models/ScheduledMessage');
    const saved = await ScheduledMessage.create({
      message,
      scheduledAt: scheduledDate,
      filePath
    });

    res.json({ message: 'Scheduled successfully', data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

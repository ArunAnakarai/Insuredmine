const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const messageController = require('../controllers/messageController');

router.post('/schedule', messageController.scheduleMessage);

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const { Worker } = require('worker_threads');
const policyController = require('../controllers/policyController');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  const worker = new Worker(path.join(__dirname, '../workers/uploader.js'), {
    workerData: { filePath: req.file.path }
  });

  worker.on('message', msg => {
    res.status(200).json({ message: 'File processed successfully', data: msg });
  });

  worker.on('error', err => {
    res.status(500).json({ error: 'Worker thread error', detail: err.message });
  });
});

// username
router.post('/policy/search', policyController.searchByUsername);

// Aggregated policy
router.get('/policy/aggregate', policyController.aggregatePoliciesByUser);

module.exports = router;

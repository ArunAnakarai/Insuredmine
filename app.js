const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const config = require('./config/config');
const BOOKING = require('./routes/routes');
const apiRoutes = require('./routes/api');
console.log('config',config);

const { MONGODB_URI, PORT } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const upload = multer({ dest: 'uploads/' });
app.use('/', BOOKING);
app.use('/api', apiRoutes);

const port = PORT || 4000;

// Start the server
app.listen(port, () => {
    console.log('http://localhost:4000');
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});

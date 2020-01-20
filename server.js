'use strict';

// Loads environment variables from .env file into process.env
require('dotenv').config();

const express = require('express');

const bootstrapConfigs = require('./config/bootstrap');
const mountMiddleware = require('./middleware/index');
const db = require('./db/db');

// Routers
const movieRouter = require('./routes/movie');

// Initialize Express default app
const app = express();

bootstrapConfigs();
mountMiddleware(app);

app.use('/movie', movieRouter);

const SERVER_URL = `http://${configs.server.HOST}:${configs.server.PORT}`;

app.listen(configs.server.PORT, configs.server.HOST, async () => {
  console.log(`Server starts at ${SERVER_URL}`);
  await db.connect();
});

module.exports = app; // export app for testing
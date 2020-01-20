const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./error');

module.exports = (app) => {
  app.use(express.json()); // parse application/json
  app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.text({ type: 'text/plain' })); // parse text/plain

  // Error-handling middleware must be defined last
  app.use(errorHandler);
};
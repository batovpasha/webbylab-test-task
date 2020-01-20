const mongoose = require('mongoose');

// Movie schema
const movie = require('../schemas/movie');

module.exports = mongoose.model('Movie', movie, 'movies');
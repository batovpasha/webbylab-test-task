const mongoose = require('mongoose');

const movie = new mongoose.Schema({
  title: {
    type: String,
    required: true,  
    unique: true,
  },
  releaseYear: {
    type: Number,
    required: true,
    min: [1888, 'Release year is too small!'], // year when first movie occurs
  },
  format: {
    type: String,
    required: true,
    enum: ['VHS', 'DVD', 'Blu-Ray'] // available formats
  },
  stars: { // list of actors
    type: [String],
    required: true,
  }, 
});

module.exports = movie;
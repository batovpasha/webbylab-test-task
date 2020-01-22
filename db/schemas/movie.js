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
    min: [1850, 'Release year is too small!'], // year when first movie occurs
    max: [new Date().getFullYear(), 'Release year is bigger than current year!'], // current year
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
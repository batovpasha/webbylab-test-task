const express = require('express');

const {
  postAddMovie,
  deleteRemoveMovie,
  getGetMovie,
  getGetMovieListSortedByTitleInAscendingOrder,
  getGetMovieByTitle,
  getGetMovieByStarName,
  postImportFromTextFile,
} = require('../controllers/movie');

const movie = express.Router();

movie.post('/add', postAddMovie);
movie.delete('/remove', deleteRemoveMovie);
movie.get('/info', getGetMovie);
movie.get('/list', getGetMovieListSortedByTitleInAscendingOrder);
movie.get('/infoByTitle', getGetMovieByTitle);
movie.get('/infoByStarName', getGetMovieByStarName);
movie.post('/import', postImportFromTextFile);

module.exports = movie;

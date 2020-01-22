const Movie = require('../db/models/movie');

module.exports = {
  addMovie: async (title, releaseYear, format, stars) => {
    const movie = new Movie({ title, releaseYear, format, stars });
    const addedMovie = await movie.save();
    return addedMovie;
  },
  removeMovieById: async (id) => await Movie.findByIdAndRemove(id),
  getMovieById: async (id) => await Movie.findById(id),
  getAllMoviesSortedByTitleInAscendingOrder: async () => {
    return await Movie.find({}, null, { sort: 'title' });
  },
  getMovieByTitle: async (title) => await Movie.findOne({ title }),
  getMovieByStarName: async (starName) => {
    return await Movie.findOne({ stars: starName });
  },
  addAllMovies: async (movies) => await Movie.insertMany(movies),
  getMovieByAllFieldValues: async (title, releaseYear, format, stars) => {
    return await Movie.findOne({ title, releaseYear, format, stars });
  }
};
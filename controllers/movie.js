const { 
  addMovie,
  removeMovieById,
  getMovieById,
  getAllMoviesSortedByTitleInAscendingOrder,
  getMovieByTitle,
  getMovieByStarName,
  addAllMovies,
} = require('../repository/movie');

const parseMovies = require('../lib/movie-parser');

const postAddMovie = (req, res) => {
  const { title, releaseYear, format, stars } = req.body;

  addMovie(title, releaseYear, format, stars)
    .then(movie => res.status(201).json(movie))
    .catch(error => {
      console.error(error);

      if (error.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }

      res.json({ error });
    });
};

const deleteRemoveMovie = (req, res) => {
  const { id } = req.body;

  removeMovieById(id)
    .then((movie) => {
      if (movie) {
        res.status(200).json({ message: 'Movie was deleted successfully!' });
      } else {
        res
          .status(404)
          .json({ message: 'There is no movie with such id in the database!'});
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

const getGetMovie = (req, res) => {
  const { id } = req.query;

  getMovieById(id)
    .then(movie => res.status(200).json(movie))
    .catch(error => {
      console.error(error);

      if (error.name === 'CastError') {
        res.status(404).json({ message: 'Movie not found!' });
      } else {
        res.status(500);
        res.json({ error });
      }
    });
};

const getGetMovieListSortedByTitleInAscendingOrder = (req, res) => {
  getAllMoviesSortedByTitleInAscendingOrder()
    .then(movies => res.status(200).json(movies))
    .catch(error => res.status(500).json({ error }));
};

const getGetMovieByTitle = (req, res) => {
  const { title } = req.query;

  getMovieByTitle(title)
    .then(movie => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie with such title not found!' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

const getGetMovieByStarName = (req, res) => {
  const { starName } = req.query;

  getMovieByStarName(starName)
    .then(movie => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie with such star not found!' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

const postImportFromTextFile = (req, res) => {
  let movies;

  try {
    movies = parseMovies(req.body);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
    return;
  }

  addAllMovies(movies)    
    .then(movies => res.status(201).json(movies))
    .catch(error => {
      console.error(error);

      if (error.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }

      res.json({ error });
    });
};

module.exports = {
  postAddMovie,
  deleteRemoveMovie,
  getGetMovie,
  getGetMovieListSortedByTitleInAscendingOrder,
  getGetMovieByTitle,
  getGetMovieByStarName,
  postImportFromTextFile,
};
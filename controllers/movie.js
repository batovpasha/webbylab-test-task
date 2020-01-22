const { 
  addMovie,
  removeMovieById,
  getMovieById,
  getAllMoviesSortedByTitleInAscendingOrder,
  getMovieByTitle,
  getMovieByStarName,
  addAllMovies,
  getMovieByAllFieldValues,
} = require('../repository/movie');

const parseMovies = require('../lib/movie-parser');

const postAddMovie = async (req, res) => {
  const { title, releaseYear, format, stars } = req.body;

  const sameMovie = await getMovieByAllFieldValues( 
    title, 
    releaseYear, 
    format, 
    stars 
  );

  if (sameMovie) {
    res.status(400).json({ error: 'Current movie already exists in database!' });
    return;   
  }

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
    .then(movies => {
      const mutableMovies = [];

      for (const movie of movies) {
        mutableMovies.push({
          title: movie.title,
          releaseYear: movie.releaseYear,
          format: movie.format,
          stars: [...movie.stars]
        });
      }

      const moviesWhichTitleStartsWithLowerCaseChar = mutableMovies
        .filter(movie => movie.title.charAt(0) === movie.title.charAt(0).toLowerCase())
        .sort((a, b) => a.title.localeCompare(b.title));

      const moviesWhichTitleStartsWithUpperCaseChar = mutableMovies
        .filter(movie => movie.title.charAt(0) === movie.title.charAt(0).toUpperCase())
        .sort((a, b) => a.title.localeCompare(b.title));

      res.status(200).json([
        ...moviesWhichTitleStartsWithLowerCaseChar,
        ...moviesWhichTitleStartsWithUpperCaseChar
      ]);
    })
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
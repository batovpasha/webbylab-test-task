module.exports = (text) => {
  try {
    const movieDescriptions = text.split('\n\n').filter(line => !!line); // split by empty line and remove empty lines 

    const movies = movieDescriptions.reduce((acc, description) => {
      const fields = description.split('\n');
      
      const title = fields
        .find(field => /title:/gi.test(field))
        .replace(/title:/gi, '')
        .trim();

      const releaseYear = +fields // parse received value to number
        .find(field => /release year:/gi.test(field))
        .replace(/release year:/gi, '')
        .trim();

      const format = fields
        .find(field => /format:/gi.test(field))
        .replace(/format:/gi, '')
        .trim();
      
      const stars = fields
        .find(field => /stars:/gi.test(field))
        .replace(/stars:/gi, '')
        .trim()
        .split(', ');
    
      const movie = { title, releaseYear, format, stars };

      acc.push(movie);
    
      return acc;
    }, []);

    return movies;
  } catch (error) {
    throw new Error('Wrong text format!');
  }
};
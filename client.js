'use strict';

const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SERVER_URL = 'http://localhost:8000';

/** 
 * Make custom promisify function because rl.question callback does't get error
 * as first arg so it is incompatible with util.promisify
 */
const question = query => new Promise(resolve => rl.question(query, resolve));

const options = {
  1: async function() {
    const title = await question('Enter film title: ');
    const releaseYear = await question('Enter release year: ');
    const format = await question('Enter format: ');
    const stars = await question(`Enter stars(stars must be separated through ','): `);

    const movie = {
      title,
      releaseYear: parseInt(releaseYear),
      format,
      stars: stars.split(', '),
    };

    console.clear();

    const response = await fetch(`${SERVER_URL}/movie/add`, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('Movie was successfully added!');
      const addedMovie = await response.json();
      console.log(addedMovie);
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  2: async function() {
    const id = await question('Enter movie id: ');

    const body = { id };

    console.clear();

    const response = await fetch(`${SERVER_URL}/movie/remove`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('Movie was successfully deleted!');
      console.log(await response.json());
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  3: async function() {
    const id = await question('Enter movie id: ');

    console.clear();

    const response = await fetch(encodeURI(`${SERVER_URL}/movie/info?id=${id}`));

    if (response.ok) {
      const body = await response.json();
      console.log(body);
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  4: async function() {
    console.clear();

    const response = await fetch(`${SERVER_URL}/movie/list`);

    if (response.ok) {
      const body = await response.json();
      console.log(body);
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  5: async function() {
    const title = await question('Enter movie title: ');

    console.clear();

    const response = await fetch(
      encodeURI(`${SERVER_URL}/movie/infoByTitle?title=${title}`)
    );

    if (response.ok) {
      const body = await response.json();
      console.log(body);
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  6: async function() {
    const starName = await question('Enter star name: ');

    console.clear();

    const response = await fetch(
      encodeURI(`${SERVER_URL}/movie/infoByStarName?starName=${starName}`)
    );

    if (response.ok) {
      const body = await response.json();
      console.log(body);
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  7: async function() {
    const filePath = await question('Enter absolute path of file to import: ');

    const readStream = fs.createReadStream(filePath);

    const response = await fetch(`${SERVER_URL}/movie/import`, {
      method: 'POST',
      body: readStream,
      headers: { 'Content-Type': 'text/plain' }
    });

    if (response.ok) {
      const body = await response.json();
      console.log(body);
    } else {
      const error = await response.json();
      console.error(error);
      console.log('Try again!');
    }
  },
  8: function() {
    console.log('Bye!');
    rl.close();
    process.exit(0);
  }
};

(async function startClient() {
  const option = await question(
    `Choose option and enter its number[1-8]:
     1. Add movie
     2. Remove movie
     3. Get movie info by movie id
     4. Get all movies sorted by title in ascending order
     5. Get movie by title
     6. Get movie by star name
     7. Import movies from text file
     8. Exit\n`
  );

  console.clear();

  await options[option]();

  await startClient();
})();
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const fs = require('fs');
const path = require('path');

const Movie = require('../db/models/movie');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Movie service', () => {
  // Befor each hook: remove all documents from the movie collection
  beforeEach(done => {
    Movie.deleteMany({}, err => {
      if (err) done(err);
      else done();
    });
  });

  describe('POST /movie/add', () => {
    it('should add new movie', done => {
      chai
        .request(server)
        .post('/movie/add')
        .send({
          title: 'Harry Potter and the Philosopher\'s Stone',
          releaseYear: 2001,
          format: 'DVD',
          stars: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson'],
        })
        .end((err, res) => {
          res.should.have.status(201);

          res.body.should.have.property('_id');
          res.body.should.have.property('title');
          res.body.should.have.property('releaseYear');
          res.body.should.have.property('format');
          res.body.should.have.property('stars');

          done();
        });
    });
  });

  describe('DELETE /movie/remove', () => {
    it('should delete movie with current id', done => {
      const movie = new Movie({
        title: 'Harry Potter and the Chamber of Secrets',
        releaseYear: 2002,
        format: 'DVD',
        stars: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson'],
      });

      movie.save((err, { _id }) => {
        if (err) return done(err);
        chai
          .request(server)
          .delete('/movie/remove')
          .send({
            id: _id,
          })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);

            res.body.should.have.property('message');

            Movie.findById(_id).then((err, movie) => {
              chai.expect(movie).to.be.undefined;
              done()
            });
          });
      });
    });
  });

  describe('GET /movie/info', () => {
    it('should return movie info in response', done => {
      const movie = new Movie({
        title: 'Harry Potter and the Prisoner of Azkaban',
        releaseYear: 2004,
        format: 'DVD',
        stars: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson'],
      });

      movie.save((err, { _id }) => {
        if (err) return done(err);
        chai
          .request(server)
          .get('/movie/info')
          .query({ id: _id.toString() })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);

            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('releaseYear');
            res.body.should.have.property('format');
            res.body.should.have.property('stars');

            done();
          });
      });
    });
  });

  describe('GET /movie/list', () => {
    it('should return array of films sorted by title in asc order', done => {
      const movie = new Movie({
        title: 'Harry Potter and the Goblet of Fire',
        releaseYear: 2005,
        format: 'DVD',
        stars: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson'],
      });

      movie.save((err, { _id }) => {
        if (err) return done(err);
        chai
          .request(server)
          .get('/movie/list')
          .query({ id: _id.toString() })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);

            chai.expect(res.body).to.be.an('array');

            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('releaseYear');
            res.body[0].should.have.property('format');
            res.body[0].should.have.property('stars');

            done();
          });
      });
    });
  });

  describe('GET /movie/infoByTitle', () => {
    it('should return movie by its title', done => {
      const movie = new Movie({
        title: 'Harry Potter and the Order of the Phoenix',
        releaseYear: 2007,
        format: 'DVD',
        stars: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson'],
      });

      movie.save((err, { _id }) => {
        if (err) return done(err);
        chai
          .request(server)
          .get('/movie/infoByTitle')
          .query({ title: movie.title })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);

            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('releaseYear');
            res.body.should.have.property('format');
            res.body.should.have.property('stars');

            done();
          });
      });
    });
  });

  describe('GET /movie/infoByStarName', () => {
    it('should return movie by its star name', done => {
      const movie = new Movie({
        title: 'Harry Potter and the Half-Blood Prince',
        releaseYear: 2009,
        format: 'DVD',
        stars: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson'],
      });

      movie.save((err, { _id }) => {
        if (err) return done(err);
        chai
          .request(server)
          .get('/movie/infoByStarName')
          .query({ starName: 'Daniel Radcliffe' })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);

            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.should.have.property('releaseYear');
            res.body.should.have.property('format');
            res.body.should.have.property('stars');

            done();
          });
      });
    });
  });

  describe('POST /movie/import', () => {
    it('should import all films from file', done => {
      const text = fs.readFileSync(path.join(__dirname, '..', 'sample_movies.txt'));
      chai
        .request(server)
        .post('/movie/import')
        .set('Content-Type', 'text/plain')
        .send(text.toString())
        .end((err, res) => {
          res.should.have.status(201);

          chai.expect(res.body).to.be.an('array');
        
          Movie.find({}).then((movies) => {
            chai.expect(movies).to.have.length(25);
            done();
          });
        });
    });
  });

});
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Movie service', () => {
  describe('POST /movie/add', () => {
    it('should add new movie', done => {
      chai
        .request(server)
        .post('/movie/add')
        .send({
          
        });
    });
  });
});
'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = chai.expect;
const request = supertest(app);
chai.use(chaiHttp);
// let request;
describe('Tests app', function() {
  request = chai.request('http://localhost:3000');
  it('verifies get', function(done) {
    request.get('/').expect(200).end(function(err, result) {
      test.string(result.text).contains('Congratulations');
      test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done(err);
    });
  });
});

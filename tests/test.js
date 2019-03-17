"use strict";

const supertest = require('supertest'); 
const test = require('unit.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = chai.expect;
let request = supertest(app);
chai.use(chaiHttp);
// let request;
describe('Tests app', function() {
  it('verifies get', function(done) {
    request = chai.request('http://localhost:3000');
    request.get('/pages/index.html').end(function(err, result) {
    let responseStatus = result.status;
    let responseBody = result.body; 
    expect(responseStatus).to.equal(200);
      // test.string(result.text).contains('Congratulations');
      test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done();
    });
  });
});
describe('view fhid', function() {
  it('view fhid', function(done) {
    request = chai.request('http://localhost:3000');
    request.get('/view/fhid').end(function(err, result) {
    let responseStatus = result.status;
    let responseBody = result.body; 
    expect(responseStatus).to.equal(200);
      // test.string(result.text).contains('Congratulations');
      // test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done();
    });
  });
});
describe('view list', function() {
  it('view list', function(done) {
    request = chai.request('http://localhost:3000');
    request.get('/view/list').end(function(err, result) {
    let responseStatus = result.status;
    let responseBody = result.body; 
    expect(responseStatus).to.equal(200);
      // test.string(result.text).contains('Congratulations');
      // test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done();
    });
  });
});
describe('find', function() {
  it('find', function(done) {
    request = chai.request('http://localhost:3000');
    request.get('/find').end(function(err, result) {
    let responseStatus = result.status;
    let responseBody = result.body; 
    expect(responseStatus).to.equal(404);
      // test.string(result.text).contains('Congratulations');
      // test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done();
    });
  });
});
describe('view list', function() {
  it('view list', function(done) {
    request = chai.request('http://localhost:3000');
    request.get('/view/list').end(function(err, result) {
    let responseStatus = result.status;
    let responseBody = result.body; 
    expect(responseStatus).to.equal(200);
      // test.string(result.text).contains('Congratulations');
      // test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
      done();
    });
  });
});

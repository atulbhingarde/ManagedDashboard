'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server.js');
const expect = chai.expect;
let request = supertest(app);
chai.use(chaiHttp);
// let request;
// describe('Tests app', function() {
//   request = chai.request('http://localhost:3000');
//   it('verifies get', function(done) {
//       request.get('/').expect(200).end(function(err, result) {
//       console.log(result.status);
//       test.string(result.text).contains('Congratulations');
//       test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
//       // expect(responseStatus).to.equal(200);
//       done(err);
//     });
//   });
// });


 it('should check and confirm that the url is working as expected', function(done){
  request = chai.request('http://localhost:3000');
  request.get('/pages/index.html').end(function (err, res) 
   {
    //Save the response
    let responseStatus = res.status;
    let responseBody = res.body; 
    // console.log("here " + JSON.stringify(res.body.lengthOf));
    // console.log('Here '+ res.text);
    expect(responseStatus).to.equal(200);
    
    // test.string(res.text).contains('Congratulations');
    test.value(res).hasHeader('content-type', 'text/html; charset=UTF-8');
    // expect(responseBody)
    // .to.be.an('array')
    // .that.has.lengthOf(12);
    done();
   });
 }); 
//  it('should check and confirm that the url is working as expected', function(done){
//   request = chai.request('http://localhost:3000');
//   request.get("/api/count").end(function (err, res) 
//    {
//     //Save the response
//     let responseStatus = res.status;
//     let responseBody = res.body; 
//     // console.log("here " + JSON.stringify(res.body.lengthOf));
//     // console.log('Here '+ res.text);
//     expect(responseStatus).to.equal(200);
    
//     // test.string(res.text).contains('Congratulations');
//     // test.value(res).hasHeader('content-type', 'text/html; charset=UTF-8');
//     // expect(responseBody)
//     // .to.be.an('array')
//     // .that.has.lengthOf(12);
//     done();
//    });
//  }); 

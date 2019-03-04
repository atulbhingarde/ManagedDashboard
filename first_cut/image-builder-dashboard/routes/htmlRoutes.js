// DEPENDENCIES
var path = require("path");


// ROUTING
module.exports = function (app) {
  // HTML Views - GET Requests
  app.get('/view/list', function (req, res) {
    res.render("listtable");           // successful response
  });

  app.get('/view/fhid', function (req, res) {
    res.render("fhidlist");           // successful response
  });
};

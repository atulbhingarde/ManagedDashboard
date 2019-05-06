//var connection = require('./config/connection.js');
var express = require('express');
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var app = express();
var path = require('path');

// For Static Content
var publicDir = path.join(__dirname, 'public');
app.use("/public", express.static(publicDir))

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
// app.use(bodyParser.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(publicDir))

// Router
require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
module.exports = app;

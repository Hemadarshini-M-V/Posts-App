var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

var router = require('./routes/router');


var app = express();

// Allow cross-origin resource sharing
app.use(cors());

// Parse the request body using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Allowing access to /images folder
app.use('/resources', express.static(path.join("images")));

// Using the router for all urls 
app.use(router);


app.listen(3000);
console.log("Server listening at 3000");

module.exports = app;
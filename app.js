var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');

var app = express();

// Allow cross-origin resource sharing
app.use(cors());

// Parse the request body using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Allowing access to /images folder
app.use('/resources', express.static(path.join("images")));

// Using approppriate routers for different paths
app.use('/posts', postsRouter);
app.use('/users', usersRouter);


app.listen(3000);
console.log("Server listening at 3000");

module.exports = app;
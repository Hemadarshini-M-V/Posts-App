// This is code for setting up the schema and model for Mongoose

var mongoose = require('mongoose');

// Creating schema
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: true }
});

// Creating a model
module.exports = mongoose.model('Post', postSchema);


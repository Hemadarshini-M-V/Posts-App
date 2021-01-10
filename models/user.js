// This is code for setting up the schema and model for Mongoose

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Creating schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Using the unique validator for User schema
userSchema.plugin(uniqueValidator);

// Creating a model
module.exports = mongoose.model('User', userSchema);


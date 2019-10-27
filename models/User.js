var mongoose = require('mongoose');

// Creation of a new schema for our users
var userSchema = mongoose.Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


// Creation of a new model for our users
var userModel = mongoose.model('users', userSchema);

module.exports = userModel;

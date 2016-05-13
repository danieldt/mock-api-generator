var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var API = new Schema({
  name: String,
  version: String,
  jsonString: String
});

var User = new Schema({
  username: String,
  password: String,
  apis: [API]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

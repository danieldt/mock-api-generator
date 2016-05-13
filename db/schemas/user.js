var db = require('mongoose');

module.exports = function() {
  var userSchema = db.Schema({
    username: String,
    password: String
  });

  var User = db.model('users', userSchema);
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var API = new Schema({
  name: String,
  version: String,
  jsonString: String
});

module.exports = mongoose.model('API', API);

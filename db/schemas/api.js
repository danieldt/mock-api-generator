var db = require('mongoose');

module.exports = function() {
  var apiSchema = db.Schema({
    name: String,
    version: String,
    jsonString: String
  });

  var API = db.model('apis', apiSchema);
  // var newAPI = new API({name: "my_api", version: "1.2", jsonString: '{"user":{"name":{"anyOf":["Daniel","John","Anna"]},"accounts":{"anyOf":[0,1,2,3,4,5,6,7,8,9]}}}'});
};

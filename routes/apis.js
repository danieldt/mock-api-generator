var express = require('express');
var router = express.Router();

var db = require('mongoose');
db.connect('mongodb://localhost:27017/test_db');

var API = db.model('apis', {name: String, version: String, jsonString: String});
// var newAPI = new API({name: "my_api", version: "1.2", jsonString: '{"user":{"name":{"anyOf":["Daniel","John","Anna"]},"accounts":{"anyOf":[0,1,2,3,4,5,6,7,8,9]}}}'});

/* Helpers */
var randomChoice = function(items) {
  return items[Math.floor(Math.random()*items.length)];
}

/* GET users listing. */
router.get('/:id/:version/:name/', function(req, res, next) {
  API.findOne({"_id": req.params.id, "name": req.params.name, "version": req.params.version}, function(err, api){
    /*if (err) {
      res.status(404).send("API not found.");
      return;
    }*/

    jsonResponse = JSON.parse(api.jsonString, function(k, v) {
      if (k == "anyOf") {
        return randomChoice(v);
      } else if(v.hasOwnProperty("anyOf")) {
        return v["anyOf"];
      } else {
        return v;
      }
    });

    // res.status(200).json({"response": jsonResponse, "metadata": {"id": req.params.id, "version": req.params.version, "name": req.params.name}});
    res.status(200).json(jsonResponse);
  });
});

module.exports = router;

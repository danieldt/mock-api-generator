var express = require('express');
var API = require('../models/api');
var router = express.Router();

/* Helpers */
var randomChoice = function(items) {
  return items[Math.floor(Math.random()*items.length)];
}

router.post('/save', function(req, res) {
  req.user.apis.push({name: req.body.name, version: req.body.version, jsonString: req.body.jsonString});
  // req.user.apis.create({name: req.body.name, version: req.body.version, jsonString: req.body.jsonString});

  var subdoc = req.user.apis[0];
  console.log(subdoc)
  console.log(subdoc.isNew);

  req.user.save(function (err) {
    if (err) return handleError(err)
    console.log('New API saved!');
  });

  res.redirect('/');
});

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

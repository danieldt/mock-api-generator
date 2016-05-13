var express = require('express');
var router = express.Router();

/* Helpers */
var randomChoice = function(items) {
  return items[Math.floor(Math.random()*items.length)];
}

router.post('/save', function(req, res) {
  req.user.apis.push({name: req.body.name, version: req.body.version, jsonString: req.body.jsonString});

  req.user.save(function (err) {
    if (err) return handleError(err)
    console.log('New API saved!');
  });

  res.redirect('/');
});

router.get('/:id/:version/:name/', function(req, res, next) {
  var api = req.user.apis.id(req.params.id);

  jsonResponse = JSON.parse(api.jsonString, function(k, v) {
    if (k == "anyOf") {
      return randomChoice(v);
    } else if(v.hasOwnProperty("anyOf")) {
      return v["anyOf"];
    } else {
      return v;
    }
  });

  res.status(200).json(jsonResponse);
});

module.exports = router;

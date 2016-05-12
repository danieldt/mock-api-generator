var express = require('express');
var router = express.Router();

// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json()

var randomChoice = function(items) {
  return items[Math.floor(Math.random()*items.length)];
}

jsonString = '{"data":{"message":{"anyOf":["a","b","c"]},"value":{"anyOf":[1,2,3]}}}';

JSON.parse(jsonString, function(k, v) {
  if (k == "anyOf") {
    var possibleValues = v;

    return randomChoice(possibleValues);
  } else if(v.hasOwnProperty("anyOf")) {
    return v["anyOf"];
  } else {
    return v;
  }
});

/* GET users listing. */
router.get('/:id/:version/:name/:jsonFormat', function(req, res, next) {
  // res.setHeader('Content-Type', 'application/json');
  var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var letter = randomChoice(letters);
  var number = randomChoice(numbers);

  jsonResponse = JSON.parse(req.params.jsonFormat, function(k, v) {
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

module.exports = router;

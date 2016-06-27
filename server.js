var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('playerList', ['playerList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/playerList', function (req, res) {
  console.log('I received a GET request');

  db.playerList.find(function (err, docs) {
 
    res.json(docs);
  });
});

app.post('/playerList', function (req, res) {

  db.playerList.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.get('/playerList/:id', function (req, res) {
  var id = req.params.id;

  db.playerList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/playerList/:id', function (req, res) {
  var id = req.params.id;
  db.playerList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, team: req.body.team, pts: req.body.pts}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");


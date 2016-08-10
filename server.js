var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('playerList', ['data']);
var bodyParser = require('body-parser');
var http = require('http');
var pyShell = require('python-shell');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/playerList', function (req, res) {
  console.log('I received a GET request');

  db.data.find(function (err, docs) {
 
    res.json(docs);
  });
});

app.get('/playerList/:id', function (req, res) {
  var id = req.params.id;

  db.data.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.post('/playerList', function (req, res) {

  db.data.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.put('/playerList/:id', function (req, res) {
  var id = req.params.id;
  db.data.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {onTeam: req.body.onTeam}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
		console.log("server listening on port " + app.get('port'));
});

//pyShell.run('python/decisionTree.py', function(err){
//	if(err) throw err;
//	console.log('finished');
//});

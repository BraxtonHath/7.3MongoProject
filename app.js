const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./DatascriptBraxHouse')
const MongoClient = require("mongodb").MongoClient;


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));



app.use(function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/jmbdb", function(error, db) {
    req.db = db;
    next();
  });
});

app.get('/index', function(req, res) {
  const col = req.db.collection("Robots");
  context = {};
  col.find({}).toArray(function(error, results) {
    // console.log(results);
    context.model = results;
    res.render('index.mustache', context);
  });
});


app.get('/index/:id', function (req, res) {

  var users;

  for(var i = 0; i < data.users.length; i++) {
    if (data.users[i].id == req.params.id) {
      users =data.users[i];
    }
  }
  console.log(users);
  res.render('profile.mustache', users);
});



app.post('/unemployed', function(req, res) {
  const col = req.db.collection("Robots");
  context = {};
  col.find({'job': null}).toArray(function(error, results) {
    context.model = results;
    res.render('index.mustache', context);
  });
});

app.post('/employed', function(req, res) {
  const col = req.db.collection("Robots");
  context = {};
  col.find({'job': {$ne: null}}).toArray(function(error, results) {
    context.model = results;
    res.render('index.mustache', context);
  });
});

app.listen(3000, function () {
  console.log('Successfully started express application!');
});


// var null = {
//   null: []
// }

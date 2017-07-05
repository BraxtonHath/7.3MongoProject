const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./DatascriptBraxHouse')
const MongoClient = require("mongodb").MongoClient;


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));



app.get('/index', function (req, res) {
  res.render('index.mustache', data);//just swapped to data from index
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

app.listen(3000, function () {
  console.log('Successfully started express application!');
});


// var null = {
//   null: []
// }

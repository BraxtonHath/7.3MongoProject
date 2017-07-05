const MongoClient = require("mongodb").MongoClient;
const data = require('./data');


//module.exports = {

MongoClient.connect("mongodb://localhost:27017/Datascriptbraxhouse", function(error, db) {
  const Collection = db.collection("Robots");


var Robots = [];

data.users.forEach(function(users) {
  Robots.push(users);
});

Collection.insertMany(Robots);

});

//};

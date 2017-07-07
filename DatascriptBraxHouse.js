const MongoClient = require("mongodb").MongoClient;
const data = require('./data');


//module.exports = {

MongoClient.connect("mongodb://localhost:27017/Datascriptbraxhouse", function(error, db) {
  const collection = db.collection("robots");


var robots = [];

data.users.forEach(function(users) {
  robots.push(users);
});

collection.insertMany(robots);

});

//};

var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

var uri =
  "mongodb://aalap:u4ENIOWM41eZJbbK@prod-shard-00-00-kxv8d.mongodb.net:27017,prod-shard-00-01-kxv8d.mongodb.net:27017,prod-shard-00-02-kxv8d.mongodb.net:27017/cards?ssl=true&replicaSet=Prod-shard-0&authSource=admin&retryWrites=true&w=majority";

router.get("/", function (req, res, next) {
  res.render("index.html");
  
  MongoClient.connect(uri, { useNewUrlParser: true },  function (err, client) {
    try {
      const collection = client.db("cards").collection("collection");
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  });
});

module.exports = router;

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function getEntries(client, dbName, collectionName) {
  recordsList = await client.db(dbName).collection(collectionName).find();
  console.log(recordsList);
  return recordsList;
}

var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

var uri =
  "mongodb://aalap:u4ENIOWM41eZJbbK@prod-shard-00-00-kxv8d.mongodb.net:27017,prod-shard-00-01-kxv8d.mongodb.net:27017,prod-shard-00-02-kxv8d.mongodb.net:27017/test?ssl=true&replicaSet=Prod-shard-0&authSource=admin&retryWrites=true&w=majority";

MongoClient.connect(uri, function (err, client) {
  try {
    listDatabases(client);
    listEntries(client, "prod", "records");
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
});

router.get("/", function (req, res, next) {
  res.render("index.html");
});

module.exports = router;

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function listEntries(client, dbName, collectionName) {
  recordsList = await client.db(dbName).collection(collectionName);
  console.log("Records:");
  console.log(recordsList);
}

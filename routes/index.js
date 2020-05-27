var express = require("express");
var router = express.Router();
// var MongoClient = require("mongodb").MongoClient;

// var uri =
//   "mongodb://aalap:u4ENIOWM41eZJbbK@prod-shard-00-00-kxv8d.mongodb.net:27017,prod-shard-00-01-kxv8d.mongodb.net:27017,prod-shard-00-02-kxv8d.mongodb.net:27017/cards?ssl=true&replicaSet=Prod-shard-0&authSource=admin&retryWrites=true&w=majority";

const Card = require('../models/cards');

router.get('/', function (req, res, next) {
  // res.render("index.html");
  Card.find(function(err, cards){
    res.json(cards);
  })
  /* OLD MONGO CONNECTION */
  // MongoClient.connect(uri, { useNewUrlParser: true },  function (err, client) {
  //   try {
  //     // Getting all raw values from db
  //     const collection = client.db("cards").collection("collection").find().toArray(function(err, vals) {
  //       // console.log(JSON.stringify(vals));
  //       res.json(vals);
  //   });
  //   } catch (err) {
  //     res.send(err);
  //   } finally {
  //     client.close();
  //   }
  // });
});

router.post('/new',(req,res,next)=>{
  let cardToAdd = new Card({
    id: req.body.id,
    name: req.body.name,
    creditScore: req.body.creditScore,
    acctAgeYrs: req.body.acctAgeYrs,
    acctAgeMos: req.body.acctAgeMos
  });

  cardToAdd.save((err, card)=>{
    if (err){
      res.json({msg: 'Could not add card.'});
    }
    else {
      res.json({msg: 'Card added. Thanks for contributing!'});
    }
  })
});

module.exports = router;

// async function listDatabases(client) {
//   databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }

// async function getEntries(client, dbName, collectionName) {
//   recordsList = await client.db(dbName).collection(collectionName).find();
//   console.log(recordsList);
//   return recordsList;
// }

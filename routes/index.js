var express = require("express");
var router = express.Router();

const Card = require('../models/cards');

router.get('/', function (req, res, next) {
  Card.find(function(err, cards){
    res.json(cards);
  })
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

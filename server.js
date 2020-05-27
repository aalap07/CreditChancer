var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var app = express();

mongoose.connect('mongodb://aalap:u4ENIOWM41eZJbbK@prod-shard-00-00-kxv8d.mongodb.net:27017,prod-shard-00-01-kxv8d.mongodb.net:27017,prod-shard-00-02-kxv8d.mongodb.net:27017/cards?ssl=true&replicaSet=Prod-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, dbName:'cards'});
mongoose.connection.on('connected', ()=>{
    // console.log('connected');
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);

var port = 3000;
app.listen(port, function(){
    console.log('Server started on port ' + port);
});
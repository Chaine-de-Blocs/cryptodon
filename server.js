var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Cryptos = require('./api/models/cryptosModel'),
  Messages = require('./api/models/messagesModel'),
  bodyParser = require('body-parser');

var promise = mongoose.connect('mongodb://localhost/CryptodonDB', {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var crypt = require('./api/routes/cryptos');
var mess = require('./api/routes/messages');
crypt(app);
mess(app);

app.listen(port);

console.log('API is RUNNING, let\'s donate! Port : ' + port);

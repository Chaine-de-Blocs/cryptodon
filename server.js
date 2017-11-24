var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Cryptos = require('./api/models/cryptosModel'),
  bodyParser = require('body-parser');

var promise = mongoose.connect('mongodb://localhost/CryptodonDB', {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/cryptos');
routes(app);

app.listen(port);

console.log('API is RUNNING, let\'s donate! Port : ' + port);

var mongoose = require('mongoose'),
  Crypto = mongoose.model('Cryptos');

exports.listCryptos = function (req, res) {
  Crypto.find({}, function (err, cryptos) {
    if (err) {
      res.send(err);
    }
    res.json(cryptos);
  })
}

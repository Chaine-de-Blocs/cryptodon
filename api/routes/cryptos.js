module.exports = function(app) {
  var cryptos = require('../controllers/cryptosCtrl');

  app.route('/cryptos')
    .get(cryptos.listCryptos);
}

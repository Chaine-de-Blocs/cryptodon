var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CryptoSchema = new Schema({
  ticker: {
    type: String,
    maxlength: 4,
    minlength: 3,
    uppercase: true,
    required: true,
    default: 'BTC'
  },
  name: {
    type: String,
    required: true,
    maxlength: 15,
    default: 'Bitcoin'
  }
});

module.exports = mongoose.model('Cryptos', CryptoSchema);

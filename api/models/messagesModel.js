var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    maxlength: 15,
    default: 'Anonymous'
  },
  crypto: {
    type: Schema.Types.ObjectId,
    ref: 'Cryptos'
  },
  txid: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Messages', MessageSchema);

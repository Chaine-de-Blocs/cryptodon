var btcBlockchain = require('blockchain.info/blockexplorer');

var mongoose = require('mongoose'),
  Message = mongoose.model('Messages');

exports.listMessages = function (req, res) {
  var ordering = req.query.list;

  switch (ordering) {
    case 'top':

      break;
    default:
      Message.find({})
        .sort({ createdAt: 'desc' })
        .populate('crypto')
        .exec(function (err, messages) {
          if (err) {
            res.send(err);
          }
          res.json(messages);
        });
  }
}

exports.createMessage = function (req, res) {
  var mess = new Message(req.body);
  mess.populate('crypto', function (popErr) {
    switch (mess.crypto.ticker) {
      case 'LTC':

        break;
      default:
        btcBlockchain.getTx(mess.txid).then(function (tx) {
          var output;
          var addr = '12MiddyBeumr1NAjpSgZj5bJvKf9aTS6sx';
          for (var out of tx.out) {
            if (out.addr === addr) { // TODO make addr ENV
              output = out;
              break;
            }
          }

          if (!output) {
            res.status(400).send({ error: `no value sent to address ${addr}`, code: 2 });
          }

          mess.value = out.value / 100000000;

          mess.save(function (err, message) {
            if (err) {
              res.send(err);
            }
            res.json(message);
          });
        }, function (err) {
          res.status(400).send({ error: 'tx not found', code: 1 });
        });
    }
  });
}

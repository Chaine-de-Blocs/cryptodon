var btcBlockchain = require('blockchain.info/blockexplorer');
var Bcypher = require('blockcypher');
var ltcBlockchain = new Bcypher('ltc', 'main');

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

function saveMessage (mess, res) {
  mess.save(function (err, message) {
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
}

exports.createMessage = function (req, res) {
  var mess = new Message(req.body);
  mess.populate('crypto', function (popErr) {
    switch (mess.crypto.ticker) {
      case 'LTC':
        ltcBlockchain.getTX(mess.txid, {}, function (err, tx) {
          if (err || tx.error) {
            res.status(400).send({ error: 'tx not found', code: 1 });
            return;
          }

          var output;

          for (var out of tx.outputs) {
            for (var addr of out.addresses) {
              if (addr === process.env.LTC_ADDRESS) {
                output = out;
                break;
              }
            }
            if (output) {
              break;
            }
          }

          if (!output) {
            res.status(400).send({ error: `no value sent to address ${process.env.LTC_ADDRESS}`, code: 2 });
            return;
          }

          mess.value = output.value / 100000000;

          saveMessage(mess, res);
        });
        break;
      default:
        btcBlockchain.getTx(mess.txid).then(function (tx) {
          var output;

          for (var out of tx.out) {
            if (out.addr === process.env.BTC_ADDRESS) {
              output = out;
              break;
            }
          }

          if (!output) {
            res.status(400).send({ error: `no value sent to address ${process.env.BTC_ADDRESS}`, code: 2 });
            return;
          }

          mess.value = output.value / 100000000;

          saveMessage(mess, res);
        }, function (err) {
          res.status(400).send({ error: 'tx not found', code: 1 });
        });
    }
  });
}

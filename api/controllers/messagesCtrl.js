var mongoose = require('mongoose'),
  Message = mongoose.model('Messages');

exports.listMessages = function (req, res) {
  var ordering = req.query.list;

  switch (ordering) {
    case 'top':

      break;
    default:
      Message.find({})
        .sort('-date')
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
  mess.save(function (err, message) {
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
}

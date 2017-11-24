module.exports = function(app) {
  var messages = require('../controllers/messagesCtrl');

  app.route('/messages')
    .get(messages.listMessages)
    .post(messages.createMessage);
}

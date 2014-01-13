var moment = require('moment');
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports = function(app) {

  //Route for client script.
  app.get('/scripts/socket.io.js', function(req, res) {
    return res.sendfile('./node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js');
  });

  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function (socket) {
    Message.find(null, null, {sort: {'serverDate': -1}, limit: 5}, function(err, data) {
      if(err) console.log(err);
      socket.emit('history', data);
    });

    socket.on('message', function (data, fn) {
      data.receiveDate = moment().format('YYYY-MM-DD hh:mm:ss.SS A');
      socket.broadcast.emit('message', data);
      fn(data);

      data.serverDate = new Date();

      new Message(data).save();
    });
  });

  return server;
};

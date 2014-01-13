var moment = require('moment');

module.exports = function(app) {

  //Route for client script.
  app.get('/scripts/socket.io.js', function(req, res) {
    return res.sendfile('./node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js');
  });

  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function (socket) {
    socket.emit('message', {
      message: '##Welcome to astuart.co chat. \nMarkdown is encouraged.',
      received: moment().format('YYYY-MM-DD')
    });

    socket.on('message', function (data, fn) {
      data.receiveDate = moment().format('YYYY-MM-DD');
      socket.broadcast.emit('message', data);
      fn(data);
    });
  });

  return server;
};

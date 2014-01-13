'use strict';

angular.module('sandboxApp')
.service('Chat', ['$rootScope', function Chat($rootScope) {

  var messages = [];
  var currentMessage = {message: ''};

  var socket = io.connect();

  socket.on('message', function(data) {
    $rootScope.$apply(function() {
      messages.push(data);
    });
  });

  //History update.
  socket.on('history', function(history) {
    $rootScope.$apply(function() {
      _.each(history, function(historyItem) {
        messages.push(historyItem);
      });
    });
  });

  //Sending messages.
  function sendMessage (message) {
    if(!message.message) {
      return false;
    }

    try {
      message.user = $rootScope.currentUser.name;
    } catch(e) {
      message.user = 'None';
    }

    socket.emit('message', message, function(data) {
      $rootScope.$apply(function() {
        currentMessage.message = '';
        messages.push(data);
      });
    });
  };

  return {
    messages: messages,
    currentMessage: currentMessage,
    sendMessage: sendMessage
  }
}]);

'use strict';

angular.module('sandboxApp')
  .controller('ChatCtrl', ['$scope', '$http', function ($scope, $http) {

    var messages = $scope.messages = [];
    $scope.chatMessage = {};

    var socket = io.connect();
    socket.on('message', function(data) {
      $scope.$apply(function() {
        messages.push(data);
      });
    });

    $scope.sendMessage = function(message) {
      try {
        message.user = $scope.currentUser.name;
      } catch(e) {
        message.user = 'None';
      }

      socket.emit('message', message, function(data) {
        $scope.chatMessage = {message: ''};
        $scope.$apply(function() {
          messages.push(data);
        });
      });
    };
  }]);

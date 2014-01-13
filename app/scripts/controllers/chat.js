'use strict';

angular.module('sandboxApp')
  .controller('ChatCtrl', ['$scope', 'Chat', function ($scope, Chat) {
    $scope.currentMessage = Chat.currentMessage;
    $scope.sendMessage = Chat.sendMessage;
    $scope.messages = Chat.messages;
  }]);

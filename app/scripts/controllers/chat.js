'use strict';

angular.module('sandboxApp')
  .controller('ChatCtrl', ['$scope', 'Chat', function ($scope, Chat) {
    $scope.currentMessage = Chat.currentMessage;
    $scope.sendMessage = Chat.sendMessage;
    $scope.messages = Chat.messages;

    $scope.keyPress = function(e) {
      var shifted = false;
      if(e.keyCode === 13 && !e.shiftKey) {
        $scope.sendMessage($scope.currentMessage);
      }
    };
  }]);

'use strict';

angular.module('sandboxApp')
  .controller('MarkdownCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.markdownraw = {
      content: '',
      author: 'Andrew'
    };

    $http.get('/api/blog').success(function(data) {
      $scope.blogs = data;
      $scope.markdownraw = data[0];
    });

    $scope.clear = function() {
      if( window.confirm('Do you want to erase your content? Unsaved changes will be lost.')) {
        $scope.markdown.clear();
      }
    };

    $scope.save = function() {
      if( window.confirm('Do you want to save your content?')) {
        $http.post('/api/blog', $scope.markdownraw).success(function(data) {
          $scope.markdownraw = data;
        });
      }
    };


  }]);

'use strict';

angular.module('sandboxApp')
  .controller('MarkdownCtrl', ['$scope', '$http', function ($scope, $http) {

    var defaultContent = $scope.markdownraw = {
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

    $scope.save = function(post) {
      function handleResponse (data) {
        $scope.blogs[$scope.blogs.indexOf(post)] = data;
        $scope.markdownraw = data;
      }

      if(!post._id || window.confirm('Do you want to overwrite your content?')) {
        if(!post._id) {
          $http.post('/api/blog', post).success(handleResponse);
        } else {
          $http.put('/api/blog/' + post._id, post).success(handleResponse);
        }
      }
    };

    $scope.del = function(post) {
      if( window.confirm('Do you want to delete this post?')) {
        $http.delete('/api/blog/' + $scope.markdownraw._id).success(function() {
          var index = $scope.blogs.indexOf(post);
          $scope.blogs.splice(index, 1);
          $scope.markdownraw = defaultContent;
        });
      }
    };


  }]);

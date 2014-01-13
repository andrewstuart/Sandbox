'use strict';

angular.module('sandboxApp')
.controller('MarkdownCtrl', ['$scope', '$http', function ($scope, $http) {

  var defaultContent = $scope.markdownraw = {
    content: '',
    author: $scope.currentUser.name || 'Andrew' //Default to Andrew.
  };

  $http.get('/api/blog').success(function(data) {
    $scope.blogs = data;
    $scope.markdownraw = data[0];
  });

  $scope.add = function() {
    var newBlog = _.extend({}, defaultContent);
    $scope.blogs.push(newBlog);
    $scope.markdownraw = newBlog;
  };

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
    function removeBlog() {
      var index = $scope.blogs.indexOf(post);
      $scope.blogs.splice(index, 1);
      $scope.markdownraw = $scope.blogs[$scope.blogs.length - 1] || defaultContent;
    }
    if(window.confirm('Do you want to delete this post?')) {
      if(post._id) {
        $http.delete('/api/blog/' + $scope.markdownraw._id).success(function() {
          removeBlog();
        });
      } else {
        removeBlog();
      }
    }
  };


}]);

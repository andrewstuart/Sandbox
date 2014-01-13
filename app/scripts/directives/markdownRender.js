'use strict';

angular.module('sandboxApp')
  .directive('markdownRender', function () {
    return {
      template: '<pre class="markdown-view"></pre>',
      restrict: 'E',
      controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {

        $scope.markdown = {
          clear: function() {
            $scope[$attrs.raw] = '';
          }
        };

        $scope.$watch($attrs.raw, function(newValue) {
          $element.children('pre').html(markdown.toHTML(newValue));
        });
      }],
    };
  });

'use strict';

angular.module('sandboxApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });

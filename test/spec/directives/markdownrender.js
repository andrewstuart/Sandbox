'use strict';

describe('Directive: markdownRender', function () {

  // load the directive's module
  beforeEach(module('sandboxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<markdown-render></markdown-render>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the markdownRender directive');
  }));
});

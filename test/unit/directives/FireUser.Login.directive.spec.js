'use strict';

describe("Directive: FireUserLoginForm", function() {

  var scope; 

  beforeEach(function () {
    Mocks.setupFireUser(this);
  });
 
  beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

  beforeEach(function() {
       this.element = angular.element('<fireuserloginform>');      
  });

  xit("", inject(function($compile) {
      this.element = $compile(this.element)(scope);
    }));


});
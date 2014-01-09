'use strict';

describe("Directive: FireUserLoginGithub", function() {

  var scope; 

  beforeEach(function () {
    // AngularFirebase Module    
    angular.module('firebase',[])
    module('firebase')
    module('fireUser') 
  });

  beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));
  
  it("should change the css to 'fa'", inject(function ($compile) {
       var element = angular.element('<fireuserlogingithub />');
       element = $compile(element)(scope);
       expect(element.hasClass('fa')).toBeTruthy();
    }));
});
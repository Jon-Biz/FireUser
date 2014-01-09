'use strict';

describe("Directive: FireUserLogin", function() {

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

  describe("if it is used with 'type'='email'", function() {
    beforeEach(function() {
         this.element = angular.element('<fireuserlogin>');      
    });

  });

  describe("if it is used with 'type'='github'", function() {
    beforeEach(function() {
         this.element = angular.element('<fireuserlogin type="github"/>');      
    });
    it("should change the html to githubIcon", inject(function ($compile) {
         this.element = $compile(this.element)(scope);
         expect(this.element.html()).toEqual('<i class="fa fa-github ng-scope"></i>')
    }));
  });

  describe("if it is used with 'type'='facebook'", function() {
    beforeEach(function() {
         this.element = angular.element('<fireuserlogin type="facebook"/>');      
    });
    it("should change the html to facebookIcon", inject(function ($compile) {
         this.element = $compile(this.element)(scope);
         expect(this.element.html()).toEqual('<i class="fa fa-facebook ng-scope"></i>')
    }));
  });  

});
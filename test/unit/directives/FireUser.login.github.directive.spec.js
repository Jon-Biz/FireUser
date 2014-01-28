'use strict';

describe("Directive: FireUserLogin", function() {

  var scope;

  beforeEach(function () {
    // AngularFirebase Module
    angular.module('firebase',[]);
    module('firebase');

    var FirebaseStub = this.FirebaseStub = sinon.stub();
    window.Firebase = function () {
      return FirebaseStub;
    };

    var firebaseAuthStub = this.firebaseAuthStub = sinon.stub().returns({
      $login:function () {
        return;
      }
    });
    var firebaseAuthStub = function () {return firebaseAuthStub;};

    module('fireUser', function($provide) {

      var firebaseMock = function () {
        return this;
      };

      $provide.value('FireUserConfig', { iconCss: 'fontawesome' });
      $provide.service('$firebase',firebaseMock);
      $provide.service('$firebaseAuth',firebaseAuthStub);
    });
  });

  beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

  describe("if it is used with 'type'='github'", function() {
    beforeEach(function() {
         this.element = angular.element('<fireuserlogin type="github"/>');
    });
    it("should add the classes for the github icon", inject(function ($compile) {
         this.element = $compile(this.element)(scope);
         expect(this.element.hasClass('fa')).toBeTruthy();
         expect(this.element.hasClass('fa fa-github')).toBeTruthy();
    }));
  });

  describe("if it is used with 'type'='facebook'", function() {
    beforeEach(function() {
         this.element = angular.element('<fireuserlogin type="facebook"/>');
    });
    it("should have the classes for facebook icon", inject(function ($compile) {
         this.element = $compile(this.element)(scope);
         expect(this.element.hasClass('fa')).toBeTruthy();
         expect(this.element.hasClass('fa fa-facebook')).toBeTruthy();
    }));
  });

});

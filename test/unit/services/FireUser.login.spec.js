'use strict';


describe('FirebaseRef Service', function () {
  var testUrl;
  beforeEach(function() {

    var FirebaseStub = this.FirebaseStub = sinon.stub();
    window.Firebase = function () {
      return FirebaseStub;
    };

    angular.module('firebase',[]);;
    module('firebase');

    var Firebase = this.Firebase = sinon.stub();

    var firebaseAuthStub = this.firebaseAuthStub = sinon.stub();
    var firebaseAuthMock = function () {return firebaseAuthStub;}

    var FireUserDefault = this.FireUserDefault = {};
    FireUserDefault.url = 'testing';
    FireUserDefault.redirectPath = '/testPath';
    module('fireUser', function($provide) {

      var firebaseMock = function () {
        return this;
      }
      
      $provide.constant('FireUserDefault', FireUserDefault);
      $provide.service('$firebase',firebaseMock);
      $provide.service('$firebaseAuth',firebaseAuthMock);
    });
  });

    describe("login()", function() {
      it("should call $firebas", function() {
        
      });
    });
});

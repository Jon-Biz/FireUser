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

    var FBOpts = this.FBOpts = {};
    FBOpts.url = 'testing';
    FBOpts.redirectPath = '/testPath';
    module('fireUser', function($provide) {

      var firebaseMock = function () {
        return this;
      }
      
      $provide.constant('FBOpts', FBOpts);
      $provide.service('$firebase',firebaseMock);
      $provide.service('$firebaseAuth',firebaseAuthMock);
    });
  });

    describe("login()", function() {
      it("should call $firebas", function() {
        
      });
    });
});

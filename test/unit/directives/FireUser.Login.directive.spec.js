'use strict';

describe("Directive: FireUserLoginForm", function() {

  var scope; 

  beforeEach(function () {
    // AngularFirebase Module    
    angular.module('firebase',[])
    module('firebase')

    var FirebaseStub = this.FirebaseStub = sinon.stub();
    window.Firebase = function () {
      return FirebaseStub;
    };

    var firebaseAuthStub = this.firebaseAuthStub = sinon.stub();
    var firebaseAuthStub = function () {return firebaseAuthStub;}

    module('fireUser', function($provide) {

      var firebaseMock = function () {
        return this;
      }

      var FBOpts = {};      
      $provide.constant('FBOpts', FBOpts);
      $provide.service('$firebase',firebaseMock);
      $provide.service('$firebaseAuth',firebaseAuthStub);
    });
  });

  beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

  beforeEach(function() {
       this.element = angular.element('<fireuserloginform>');      
  });


});
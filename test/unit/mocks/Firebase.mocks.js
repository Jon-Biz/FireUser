
Mocks ={
    setupFireUser:function (that) {

      Mocks.setupFirebaseJS(that);

      Mocks.setupAngularFire();

      firebaseAuthStub = Mocks.setupFirebaseAuthMock(that);
      firebaseMock = Mocks.setupFirebaseMock(that);

      module('fireUser', function($provide) {
        var firebaseMock = function () {return this;}
        $provide.service('$firebase',firebaseMock);
        $provide.service('$firebaseAuth',firebaseAuthStub);
      });
    },
    setupFirebaseJS: function (that) {
      var FirebaseStub = that.FirebaseStub = sinon.stub();
      window.Firebase = function () {return FirebaseStub;};      
    },
    setupFirebaseAuthMock:function (that) {
      // sets up firebaseAuthMock as Mock for methods
      // sets up firebaseAuthStub as Stub of firebaseAuth service and returns the auth;
      that.firebaseAuthMock = {};
      var firebaseAuthStub = that.firebaseAuthStub = sinon.stub().returns(that.firebaseAuthMock);

      return (function () {return firebaseAuthStub;});
    },
    setupFirebaseMock:function (that) {
      return (function () {return this;})
    },
    setupAngularFire:function () {
      angular.module('firebase',[])
      module('firebase')
    }
}
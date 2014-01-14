
Mocks ={
    setupFireUser:function (that) {

      Mocks.setupFirebaseJS(that);

      Mocks.setupAngularFire();

      var firebaseAuthMock = Mocks.setupFirebaseAuthMock(that);
      var firebaseMock = Mocks.setupFirebaseMock(that);

      var FBOpts = Mocks.setupFBOpts;      

      module('fireUser', function($provide) {
        var firebaseMock = function () {return this;}
        var FBOpts = {};      
        $provide.constant('FBOpts', FBOpts);
        $provide.service('$firebase',firebaseMock);
        $provide.service('$firebaseAuth',firebaseAuthMock);
      });

    },
    setupFirebaseJS: function (that) {
      var FirebaseStub = that.FirebaseStub = sinon.stub();
      window.Firebase = function () {return FirebaseStub;};      
    },
    setupFirebaseAuthMock:function (that) {
      var firebaseAuthStub = that.firebaseAuthStub = sinon.stub();
      return (function () {return firebaseAuthStub;})
    },
    setupFirebaseMock:function (that) {
      return (function () {return this;})
    },
    setupAngularFire:function () {
      angular.module('firebase',[])
      module('firebase')
    },
    setupFBOpts: function(){
      return {};
    }
}

Mocks ={
    setupFireUser:function (that) {

      Mocks.setupFirebaseJS(that);

      Mocks.setupAngularFire();

      var firebaseAuthStub = Mocks.setupFirebaseAuthMock(that);
      var firebaseMock = Mocks.setupFirebaseMock(that);
      var router$state = Mocks.setupRouter(that);

      module('fireUser', function($provide) {
        $provide.service('FireUserConfig',function () {return{}})
        $provide.service('$firebase',firebaseMock);
        $provide.service('$firebaseSimpleLogin',firebaseAuthStub);
        $provide.service('$state',router$state);
      });
    },
    setupFirebaseJS: function (that) {
      var FirebaseStub = that.FirebaseStub = sinon.stub();
      window.Firebase = function () {return FirebaseStub;};      
    },
    setupAngularFire:function () {
      angular.module('firebase',[])
      module('firebase')
    },
    setupFirebaseAuthMock:function (that) {

      that.firebaseAuthMock = {};
      var firebaseAuthStub = that.firebaseAuthStub = sinon.stub().returns(that.firebaseAuthMock);

      return (function () {return firebaseAuthStub;});
    },
    setupFirebaseMock:function (that) {
      return (function () {return this;})
    },
    setupRouter:function (that) {
      var angularUiRouter = sinon.stub();
      return angularUiRouter;
    }

}
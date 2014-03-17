
Mocks ={
    setupFireUser:function (that) {

      Mocks.setupFirebaseJS(that);

      Mocks.setupAngularFire();

      var firebaseAuthStub = Mocks.setupFirebaseAuthMock(that);
      var firebaseMock = Mocks.setupFirebaseMock(that);
      var router$state = Mocks.setupRouter(that);

      module('fireUser', function($provide) {
        $provide.service('FireUserConfig',function () {return {url:'test'}})
        $provide.service('$firebase',function(){return firebaseMock});
        $provide.service('$firebaseSimpleLogin',firebaseAuthStub);
        $provide.service('$state',router$state);
      });
    },
    setupFirebaseJS: function (that) {
      var FirebaseStub = that.FirebaseStub = sinon.stub();
      window.Firebase = FirebaseStub;      
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
      that.FirebaseInstance = sinon.stub().returns(sinon.stub())

      that.FirebaseService = sinon.stub().returns(that.FirebaseInstance);
      return that.FirebaseService;
    },
    setupRouter:function (that) {
      var angularUiRouter = sinon.stub();
      return angularUiRouter;
    }

}
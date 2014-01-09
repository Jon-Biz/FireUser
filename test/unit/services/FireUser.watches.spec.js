'use strict';


describe('FirebaseRef Service', function () {
  var testUrl;
  beforeEach(function() {

    var FirebaseStub = this.FirebaseStub = sinon.stub();
    window.Firebase = sinon.stub().returns(FirebaseStub);

  });
  beforeEach(function() {
        
    angular.module('firebase',[])
      // .service('$firebase',firebaseMock)
      // .constant('FBOpts',FBOpts)
      // .service('$firebaseAuth',firebaseAuthMock);

    module('firebase');

  });

  beforeEach(function() {

    var firebaseStub = this.firebaseStub = sinon.stub().returns(
      {'$bind':function () {return this;},
      'then':function () {return this;},
      '$on':function () {return this}
    });

    var firebaseMock = this.firebaseMock = sinon.stub().returns(firebaseStub);

    var FBOpts = this.FBOpts = {};
    FBOpts.url = 'testing';
    FBOpts.redirectPath = '/testPath';

    var firebaseAuthStub = this.firebaseAuthStub = sinon.stub();
    var firebaseAuthMock = function () {return firebaseAuthStub;}

    module('fireUser', function($provide) {
      $provide.constant('FBOpts', FBOpts);
      $provide.service('$firebase',firebaseMock);
      $provide.service('$firebaseAuth',firebaseAuthMock);
    });
  });

  beforeEach(function() {
    var Firebase = this.Firebase = sinon.stub();
  });

  beforeEach(inject(function($injector,_$rootScope_,$location) {
    this.location = $location
    this.scope = _$rootScope_.$new();
    this.fireUser = $injector.get('$fireUser',{$rootScope:this.scope,$location:this.location})
    }));

  it("should rebroadcast logout messages", function() {
    var logoutSpy = sinon.spy();
    this.scope.$on(this.fireUser.LOGOUT_EVENT,logoutSpy);

    this.scope.$emit('$firebaseAuth:logout');

    expect(logoutSpy).toHaveBeenCalled();
  })

  it("should rebroadcast auth error messages", function() {
    var authErrorSpy = sinon.spy();
    this.scope.$on(this.fireUser.LOGIN_ERROR_EVENT,authErrorSpy);
    this.scope.$emit('$firebaseAuth:error');

    expect(authErrorSpy).toHaveBeenCalled();
  })

  describe("when it receives the login message", function() {

    beforeEach(function() {
      this.user = {id:'test'}
    });
    it("should rebroadcast login messages", function() {
      var loginSpy = sinon.spy();
      this.scope.$on(this.fireUser.LOGIN_EVENT,loginSpy);
      this.scope.$emit('$firebaseAuth:login',this.user);

      expect(loginSpy).toHaveBeenCalled();
    })

    it("should set $location.path to '/'", function() {

      this.scope.$emit('$firebaseAuth:login',this.user);

      expect(this.location.path()).toEqual('/');
    });
    
    it("should call $firebase service", function() {
      expect(this.firebaseMock).toHaveBeenCalled();
    });

    it("should call $firebase service with the apropriate url", function() {
      var url = this.FBOpts.url + this.FBOpts.dataloc + this.user.id
//      expect(this.firebaseMock.calledWithNew()).toBeTruthy();
      console.log(window.Firebase.args);
      expect(window.Firebase.calledWithNew()).toBeTruthy();
    });

  });

  xdescribe("when login message has received", function() {
    beforeEach(function() {
      this.scope.$emit('$firebaseAuth:login',{id:'test'});    
    });
    
    it("should rebroadcast logout messages", function() {

      var loadedSpy = sinon.spy();
      this.scope.$on(this.fireUser.USER_DATA_LOADED_EVENT,loadedSpy);
      this.scope.$broadcast('loaded');

      expect(loadedSpy).toHaveBeenCalled();

      // var changeSpy = sinon.spy();
      // this.scope.$on(this.fireUser.USER_DATA_CHANGED_EVENT,changeSpy);
      // this.scope.$broadcast('change');

      // expect(changeSpy).toHaveBeenCalled();

    //   $rootScope.$on('$firebaseAuth:login', function(evt, user) {
    //     $location.path('/');
    //     _angularFireRef = $firebase(new Firebase(FBURL + 'userdata/' + user.id));
    //     $rootScope.userdata = angular.copy(_angularFireRef);
    //     _angularFireRef.$bind($rootScope, 'userdata').then(function(unb) {
    //       unbind = unb;
    //     });

    //     $rootScope.userdata.$on('loaded', function(data) {
    //       $rootScope.$broadcast(self.USER_DATA_LOADED_EVENT, data);
    //     });

    //     $rootScope.userdata.$on('change', function(data) {
    //       $rootScope.$broadcast(self.USER_DATA_CHANGED_EVENT, data);
    //     });
    //   });

    });

  });
});

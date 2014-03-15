'use strict';


xdescribe('FirebaseRef Service', function () {
  beforeEach(function() {

    Mocks.setupFireUser(this);
  });


  it("should rebroadcast logout messages", inject(function($fireUser) {
      var logoutSpy = sinon.spy();
      $rootScope.$on($fireUser.LOGOUT_EVENT,logoutSpy);  
      $rootScope.$emit('$firebaseAuth:logout');
  
      expect(logoutSpy).toHaveBeenCalled();
    }))

  xit("should rebroadcast auth error messages", function() {
    var authErrorSpy = sinon.spy();
    this.scope.$on(this.fireUser.LOGIN_ERROR_EVENT,authErrorSpy);
    this.scope.$emit('$firebaseAuth:error');

    expect(authErrorSpy).toHaveBeenCalled();
  })


  xdescribe("when it receives the login message", function() {
    describe("it should retrieve the user's data", function() {

      beforeEach(function() {
        this.user = {id:'test'}
      });

        
      it("should redirect the app to the redirectPath - set $location.path to '/'", function() {
        this.scope.$emit('$firebaseAuth:login',this.user);
        expect(this.location.path()).toEqual('/' );
      });
      
      it("should call the Firebase Global a second time", function() {
        expect(window.Firebase).toHaveBeenCalledOnce();
        this.scope.$emit('$firebaseAuth:login',this.user);
        expect(window.Firebase).toHaveBeenCalledTwice();      
      });
      xit("should call the Firebase Global with the apropriate url", function() {
        var url = this.FireUserDefault.url + this.FireUserDefault.datalocation + this.user.id
        this.scope.$emit('$firebaseAuth:login',this.user);
        expect(window.Firebase.args[1][0]).toEqual(url);
      });

      it("should rebroadcast login messages", function() {
        var loginSpy = sinon.spy();
        this.scope.$on(this.fireUser.LOGIN_EVENT,loginSpy);
        this.scope.$emit('$firebaseAuth:login',this.user);

        expect(loginSpy).toHaveBeenCalled();
      });
    });
  });
});


xdescribe('FirebaseRef Service', function () {
  beforeEach(function() {

    // Firebase Global
    var FirebaseStub = this.FirebaseStub = sinon.stub();
    window.Firebase = sinon.stub().returns(FirebaseStub);
  });

  beforeEach(function() {

    // AngularFirebase Module    
    angular.module('firebase',[])
    module('firebase');

  });

  beforeEach(function() {

    // Test configuration
    var FireUserDefault = this.FireUserDefault = {};
    FireUserDefault.url = 'testing';
    FireUserDefault.datalocation = '/testPath';

    // Firebase service
    var firebaseServiceStub = this.firebaseServiceStub = sinon.stub().returns(
      {'$bind':function () {return this;},
      'then':function () {return this;},
      '$on':function () {return this}
    });

    var firebaseServiceMock = this.firebaseServiceMock = sinon.stub().returns(firebaseServiceStub);

    // FirebaseAuth service
    var firebaseAuthStub = this.firebaseAuthStub = sinon.stub();
    var firebaseAuthStub = function () {return firebaseAuthStub;}

    module('fireUser', function($provide) {
      $provide.constant('FireUserDefault', FireUserDefault);
      $provide.service('$firebase',firebaseServiceMock);
      $provide.service('$firebaseAuth',firebaseAuthStub);
    });
  });

  //Post Instantiation Injection
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

  //   $rootScope.$on('$firebaseAuth:login', function(evt, user) {
  //     $location.path('/');
  //     _angularFireRef = $firebase(new Firebase(FBURL + 'userdata/' + user.id));
  //     $rootScope.userdata = angular.copy(_angularFireRef);
  //     _angularFireRef.$bind($rootScope, 'userdata').then(function(unb) {
  //       unbind = unb;
  //     });

  describe("when it receives the login message", function() {
    describe("it should retrieve the user's data", function() {

      beforeEach(function() {
        this.user = {id:'test'}
      });

        
      it("should redirect the app to the redirectPath - set $location.path to '/'", function() {
        this.scope.$emit('$firebaseAuth:login',this.user);
        expect(this.location.path()).toEqual('/' );
      });
      
      it("should call the Firebase Global a second time", function() {
        expect(window.Firebase).toHaveBeenCalledOnce();
        this.scope.$emit('$firebaseAuth:login',this.user);
        expect(window.Firebase).toHaveBeenCalledTwice();      
      });
      xit("should call the Firebase Global with the apropriate url", function() {
        var url = this.FireUserDefault.url + this.FireUserDefault.datalocation + this.user.id
        this.scope.$emit('$firebaseAuth:login',this.user);
        expect(window.Firebase.args[1][0]).toEqual(url);
      });

      it("should rebroadcast login messages", function() {
        var loginSpy = sinon.spy();
        this.scope.$on(this.fireUser.LOGIN_EVENT,loginSpy);
        this.scope.$emit('$firebaseAuth:login',this.user);

        expect(loginSpy).toHaveBeenCalled();
      });
    });
  });
});

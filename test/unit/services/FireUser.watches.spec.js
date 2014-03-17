'use strict';


describe('FirebaseRef Service', function () {
  beforeEach(function() {

    Mocks.setupFireUser(this);
  });


  // it('should have a properly working VideoCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
  //   var searchID = 'cars';
  //   var response = $httpBackend.expectJSONP(
  //     'https://gdata.youtube.com/feeds/api/videos/' + searchID + '?v=2&alt=json&callback=JSON_CALLBACK');
  //   response.respond(null);

  //   var $scope = $rootScope.$new();
  //   var ctrl = $controller('VideoCtrl', {
  //     $scope : $scope,
  //     $routeParams : {
  //       id : searchID
  //     }
  //   });
  // }));


  it("should rebroadcast logout messages", inject(function($fireUser,$rootScope) {
      var logoutSpy = sinon.spy();
      $rootScope.$on($fireUser.LOGOUT_EVENT,logoutSpy);  
      $rootScope.$emit('$firebaseSimpleLogin:logout');
      expect(logoutSpy).toHaveBeenCalled();
    }))

  it("should rebroadcast auth error messages", inject(function($fireUser,$rootScope) {
      var authErrorSpy = sinon.spy();
      $rootScope.$on($fireUser.LOGIN_ERROR_EVENT,authErrorSpy);
      $rootScope.$emit('$firebaseSimpleLogin:error');
  
      expect(authErrorSpy).toHaveBeenCalled();
    }))


  describe("when it receives the login message", function() {
    describe("it should retrieve the user's data", function() {

      beforeEach(inject(function($rootScope,$fireUser) {
        this.user = {id:'test'}
        this.scope = $rootScope;
        this.FirebaseService.returns({
          $bind : function() {
            return {then:function() {}};
          },
          $on:function() {}
        });
      }));

              
      it("should call the Firebase Global a second time", function() {
        expect(this.FirebaseStub).toHaveBeenCalledOnce();
        this.scope.$broadcast('$firebaseSimpleLogin:login',this.user);
        expect(this.FirebaseStub).toHaveBeenCalledTwice();      
      });

      it("should call the Firebase Global with the apropriate url", inject(function(FireUserValues) {
        var url = FireUserValues.url + FireUserValues.dataLocation + '/' + this.user.id
        this.scope.$emit('$firebaseSimpleLogin:login',this.user);
        expect(window.Firebase.args[1][0]).toEqual(url);
      }));

      it("should rebroadcast login messages", inject(function($fireUser) {
        var loginSpy = sinon.spy();
        this.scope.$on($fireUser.LOGIN_EVENT,loginSpy);
        this.scope.$emit('$firebaseSimpleLogin:login',this.user);

        expect(loginSpy).toHaveBeenCalled();
      }));
      it("should set $rootScope.data.userLoggedIn to true", inject(function($fireUser,$rootScope) {
        expect(this.scope.data.userLoggedIn).toBeFalsy();
        this.scope.$emit('$firebaseSimpleLogin:login',this.user);
        expect(this.scope.data.userLoggedIn).toBeTruthy();
      }));
      it("and if followed by a logout message, should set $rootScope.data.userLoggedIn to false", inject(function($fireUser,$rootScope) {
        expect(this.scope.data.userLoggedIn).toBeFalsy();
        this.scope.$emit('$firebaseSimpleLogin:login',this.user);
        expect(this.scope.data.userLoggedIn).toBeTruthy();
        this.scope.$emit('$firebaseSimpleLogin:logout',this.user);
        expect(this.scope.data.userLoggedIn).toBeFalsy();
      }));
      
    });
  });
});

'use strict';


describe('FirebaseRef Service', function () {
  var testUrl;
  beforeEach(function() {

    Mocks.setupFireUser(this);
    // mocks angularFire module
    // creates stubs 
    //  this.Firebase (Firebase global)
    //  this.firebaseMock (Angular Firebase service)
    //  this.firebaseAuthStub (Angular Firebase Auth provider)
    //  this.firebaseAuthMock (Angular Firebase Auth returned service)

  });

  describe("when createUser() is called", function() {
      beforeEach(inject(function ($fireUser, $q) {

        this.q = $q.defer();
        this.firebaseAuthMock.$createUser = sinon.stub().returns(this.q);
        this.user = {email:'test',password:'test'};

      }))

      it("should be defined", inject(function($fireUser) {
        var createUser = $fireUser.createUser(this.user)
        expect($fireUser.createUser(this.user)).toBeDefined();
      }));

      it("should call FBauth $createuser", inject(function($fireUser) {
        var createUser = $fireUser.createUser(this.user)
        expect(this.firebaseAuthMock.$createUser).toHaveBeenCalled();
      }));

      it("should return a promise", inject(function($fireUser) {
        var createUser = $fireUser.createUser(this.user)
        expect(createUser.then).toBeDefined();
      }));

      describe("then the returned promise is resolved", function() {

        it("should broadcast $fireUser.USER_CREATED_EVENT on $rootScope", inject(function($fireUser, $rootScope) {
          var userWasCreated = false;
          $rootScope.$on($fireUser.USER_CREATED_EVENT,function () {
            userWasCreated = true;
          })          

          var createUser = $fireUser.createUser(this.user);

          this.q.resolve();
          $rootScope.$apply();

          expect(userWasCreated).toBeTruthy();
        }));

      });

      describe("then the returned promise is rejected", function() {

        it("should broadcast $fireUser.USER_CREATION_ERROR_EVENT on $rootScope", inject(function($fireUser, $rootScope) {
          var userWasntCreated = false;
          $rootScope.$on($fireUser.USER_CREATION_ERROR_EVENT,function () {
            userWasntCreated = true;
          })          

          var createUser = $fireUser.createUser(this.user);

          this.q.reject();
          $rootScope.$apply();

          expect(userWasntCreated).toBeTruthy();
        }));

      });

  });

});
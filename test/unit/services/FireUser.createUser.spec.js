'use strict';


describe('FirebaseRef Service', function () {
  var testUrl;
  beforeEach(function() {

    Mocks.setupFireUser(this);

  });

  describe("when createUser() is called", function() {
      beforeEach(inject(function ($fireUser, $q) {

        this.q = $q.defer();
        this.firebaseAuthMock.$createUser = sinon.stub().returns(this.q.promise);
        this.user = {email:'test',password:'test'};

      }))

      it("should be defined", inject(function($fireUser) {
        var createUser = $fireUser.createUser(this.user)
        expect($fireUser).toBeDefined();
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
          var userWasCreated = sinon.spy($rootScope,"$broadcast");

          this.user.id = 'test';

          var createUser = $fireUser.createUser(this.user);

          this.q.resolve(true, this.user);
          $rootScope.$apply();

          expect(userWasCreated).toHaveBeenCalled();
        }));

      });

      describe("when the returned promise fails", function() {

        it("should broadcast $fireUser.USER_CREATION_ERROR_EVENT on $rootScope", inject(function($fireUser, $rootScope) {
          var userWasntCreated = sinon.spy($rootScope,"$broadcast");

          var createUser = $fireUser.createUser(this.user);

          this.q.resolve(true);
          $rootScope.$apply();

          expect(userWasntCreated).toHaveBeenCalled();
        }));

      });

  });

});
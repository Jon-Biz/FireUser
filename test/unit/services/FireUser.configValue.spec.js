
xdescribe("the FireUser service", function() {
  describe("when instantiated without a FireUserConfig value service", function() {

    beforeEach(function() {

      Mocks.setupFirebaseJS(this);

      Mocks.setupAngularFire();

      this.firebaseAuthStub = Mocks.setupFirebaseAuthMock(this);
      this.firebaseMock = Mocks.setupFirebaseMock(this);
      this.router$state = Mocks.setupRouter(this);

		});

		it("should thorw and error if FireUserConfig.url is not defined", function() {
      var errorflag = false;
  
      try{
        var FUconfig = {
        }
        module('fireUser', function($provide) {
          $provide.service('FireUserConfig',FUconfig);
          $provide.service('$firebase',firebaseMock);
          $provide.service('$firebaseSimpleLogin',firebaseAuthStub);
          $provide.service('$state',router$state);
        });

      }
      catch(err){
        errorflag = true;
      }

      expect(errorflag).toBeTruthy();
    });

    xit("should thorw and error if FireUserConfig.url is not defined", inject(function() {
      var errorflag = false;

      try{
      }
      catch(err){
//        errorflag = true;
      }

      expect(errorflag).toBeTruthy();
    }));

  });
  xdescribe("when instantiated after a FireUserConfig value service is set", function() {

    beforeEach(function() {

      Mocks.setupFirebaseJS(this);

      Mocks.setupAngularFire();

      var firebaseAuthMock = Mocks.setupFirebaseAuthMock(this);
      var firebaseMock = Mocks.setupFirebaseMock(this);

      var FBOpts = Mocks.setupFBOpts;

      this.FBconfig = {url:'firebase url'}
      angular.module('fireUser')
        .value('FireUserConfig',this.FBconfig)

      module('fireUser', function($provide) {
        var firebaseMock = function () {return this;}
        $provide.service('$firebase',firebaseMock);
        $provide.service('$firebaseAuth',firebaseAuthMock);
      });
      
    });

    it("should have not a undefined options.url variable", inject(function($fireUser) {
      expect($fireUser.options.url).toEqual(this.FBconfig.url)
    }));

    it("it should set options.url using the FireUserConfig value", inject(function($fireUser) {
      expect($fireUser.options.url).toBeDefined();
    }));

    it("should extend FireUserDefaul with FireUserConfig to create the options", inject(function($fireUser) {
      expect($fireUser.options.url).toEqual(this.FBconfig.url)
      expect($fireUser.options.datalocation).toEqual(this.FireUserDefaul.datalocation);
    }));

  });

});
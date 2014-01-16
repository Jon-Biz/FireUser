
xdescribe("the FireUser service", function() {
  describe("when instantiated without a FireUserConfig value service", function() {

    beforeEach(function() {

      Mocks.setupFireUser(this);

		});

		xit("should have an undefined FireUserConfig.url", inject(function($fireUser) {
      expect($fireUser.options.url).not.toBeDefined();
    }));

		xit("should throw an error", function() {
		  
		});
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

      var FireUserDefaul = this.FireUserDefaul = {'datalocation':'datalocation'};      
      module('fireUser', function($provide) {
        var firebaseMock = function () {return this;}
        $provide.constant('FireUserDefault', FireUserDefault);
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
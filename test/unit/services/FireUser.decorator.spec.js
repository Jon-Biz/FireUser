
describe("the FireUser service", function() {
  describe("when instantiated without a decorator", function() {

    beforeEach(function() {

      Mocks.setupFireUser(this);

		});

		it("should have a undefined options", inject(function($fireUser) {
      expect($fireUser.options).not.toBeDefined();
    }));

		xit("should throw an error", function() {
		  
		});
  });
  describe("when instantiated after a decorator is set", function() {

    beforeEach(function() {
      angular.module('fireUser').config(function ($provide) {
        $provide.decorator('$fireUser',function ($delegate) {
          $delegate.options = {}
          return $delegate;
        })
      })  

    });

    beforeEach(function() {
      Mocks.setupFireUser(this);
    });

    it("should have a defined options variable", inject(function($fireUser) {
      expect($fireUser.options).toBeDefined();
    }));

  });

});
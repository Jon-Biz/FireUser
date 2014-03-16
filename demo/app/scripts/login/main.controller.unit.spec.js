describe("the main controller", function() {
	beforeEach(function() {
		this.scope;
	  module('FireUserDemo');
	});
  it
  ("should attach logged in to the scope", inject(function($rootScope,$controller) {
  	$scope = $rootScope.$new()
  	var ctrl = $controller('Main',{
  		$scope: $scope
  	})
   	expect($scope.loginstatus).toBeDefined();
   }));
});

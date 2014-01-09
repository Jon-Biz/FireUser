'use strict';

xdescribe('Directive: emailText', function () {

  // load the service's module
  beforeEach(module('fireUser'));
//  beforeEach(module('app/views/email/basic.html'));

  // instantiate service
  var emailService, scope, element;
  beforeEach(inject(function (_fireUser_,$rootScope) {
    emailService = _emailService_;
    scope = $rootScope.$new();
  }));

  it('should do something', function () {
    expect(!!emailService).toBe(true);
  });

  console.log('ToDo: Fix rendering');
  xit("should return an html element compiled against the scope", function() {

      scope.name = 'bumpant';
      var element =  emailService.get(scope);

      var result = element.find('h3').prop('innerHTML');
      expect(result).toBe('Hi, '+ scope.name);

    });  

});


xdescribe('Directive: formInput', function () {

  // load the directive's module
  beforeEach(module('shmooza'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-input></form-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the formInput directive');
  }));
});


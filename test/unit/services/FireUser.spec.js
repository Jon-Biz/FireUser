'use strict';


describe('FirebaseRef Service', function () {
  var testUrl;
  beforeEach(function() {

    var FirebaseStub = this.FirebaseStub = sinon.stub();
    window.Firebase = function () {
      return FirebaseStub;
    };

  });
  beforeEach(function() {
        
    angular.module('firebase',[])
      // .service('$firebase',firebaseMock)
      // .constant('FireUserDefault',FireUserDefault)
      // .service('$firebaseAuth',firebaseAuthStub);

    module('firebase');

  });

  beforeEach(function() {

    var firebaseMock = Mocks.setupFirebaseMock(this);
    var firebaseAuthStub = Mocks.setupFirebaseAuthMock(this);

    module('fireUser', function($provide) {
      $provide.service('$firebase',firebaseMock);
      $provide.service('$firebaseAuth',firebaseAuthStub);
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

  it('should be defined', inject(function($injector,_$rootScope_) {
    expect(this.fireUser).toBeDefined();
  }));

  it('should call firebaseAuth',inject(function($fireUser) {
    expect(this.firebaseAuthStub).toHaveBeenCalled();
  }));

  it('should call firebaseAuth with the FireUser global',inject(function($fireUser) {
    expect(this.firebaseAuthStub).toHaveBeenCalled();
    expect(this.firebaseAuthStub.args[0][0]).toEqual(this.FirebaseStub)    
  }));

  xit('should call firebaseAuth with the redirect page as the 2nd arg',inject(function($fireUser) {
    expect(this.firebaseAuthStub).toHaveBeenCalled();
    expect(this.firebaseAuthStub.args[0][1]).toEqual({path:this.FireUserDefault.redirectPath})    
  }));

});

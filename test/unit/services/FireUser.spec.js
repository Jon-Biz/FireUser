'use strict';

describe('FirebaseRef Service', function () {
  var testUrl;
  beforeEach(function() {

    Mocks.setupFireUser(this);
  });

  it('should be defined', inject(function($fireUser) {
    expect($fireUser).toBeDefined();
    expect($fireUser.LOGIN_EVENT).toBeDefined();
    expect($fireUser.LOGIN_EVENT).toEqual('fireuser:login'); 
  }));

  it('should call firebaseAuth',inject(function($fireUser) {
    expect(this.firebaseAuthStub).toHaveBeenCalled();
  }));


});
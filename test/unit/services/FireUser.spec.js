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

  it('should call firebaseAuth with the FireUser global',inject(function($fireUser) {
    expect(this.firebaseAuthStub).toHaveBeenCalled();
    expect(this.firebaseAuthStub.args[0][0]).toEqual(this.FirebaseStub)    
  }));

  it('should call firebaseAuth with the redirect page as the 2nd arg',inject(function($fireUser,FireUserDefault) {
    expect(this.firebaseAuthStub).toHaveBeenCalled();
    expect(this.firebaseAuthStub.args[0][1]).toEqual({path:FireUserDefault.redirectPath})    
  }));

});
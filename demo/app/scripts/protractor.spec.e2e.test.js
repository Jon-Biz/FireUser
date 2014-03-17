browser.ignoreSynchronization = true;

var FireUserDemoPage = function () {
  this.done = browser.get('http://localhost:3333/#');

  this.title = browser.driver.getTitle();
  this.pageTitle = element(by.id('pageTitle'));

  return this;
}

describe('FireUser Demo homepage', function() {

  it('should have the page title FireUserDemo', function() {
    var page = new FireUserDemoPage();    
      expect(page.title).toEqual('FireUserDemo');
  });

  it("should have a header that says 'Fire User Demo - not logged in'", function() {
    var page = new FireUserDemoPage();
      expect(page.pageTitle.getText()).toEqual('Fire User Demo - not logged in');
  });

  it("logged in model should say not logged in", function() {
    var page = new FireUserDemoPage();
    expect($('#status').getText()).toEqual('not logged in');
  });
  it("should have a login form", function() {
    var page = new FireUserDemoPage();
  expect($('#loginForm')).toBeDefined();    
  });

  it("should have a github login icon", function() {
    var page = new FireUserDemoPage();
  expect($('.fa-github')).toBeDefined();    
  });

  it("should have a facebook login icon", function() {
    var page = new FireUserDemoPage();
  expect($('.fa-facebook')).toBeDefined();    
  });

  it("should have a twitter login icon", function() {
    var page = new FireUserDemoPage();
  expect($('.fa-twitter')).toBeDefined();    
  });

});
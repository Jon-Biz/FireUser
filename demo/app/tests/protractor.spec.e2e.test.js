browser.ignoreSynchronization = true;

var FireUserDemoPage = function () {
  this.done = browser.get('http://localhost:3333/#');

  this.title = browser.driver.getTitle();
  this.pageTitle = element(by.id('pageTitle'));

  return this;
}

describe('FireUser Demo homepage', function() {

  it('should have the page title Fire User Demo', function() {
    var page = new FireUserDemoPage();    
      expect(page.title).toEqual('Fire User Demo');
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
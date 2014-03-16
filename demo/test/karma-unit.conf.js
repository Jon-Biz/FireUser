// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

var shared = require('./karma-shared.conf');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([
  //extra testing code
  //  
    'app/bower_components/sinon/lib/sinon.js',
    'app/bower_components/sinon/lib/sinon/call.js',
    'app/bower_components/sinon/lib/sinon/spy.js',
    'app/bower_components/sinon/lib/sinon/stub.js',
    'app/bower_components/jasmine-sinon/lib/jasmine-sinon.js',

    //test files
      'app/scripts/**/*.unit.spec.js'
  ]);
};

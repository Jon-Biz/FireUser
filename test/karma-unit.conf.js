// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

'use strict';

var shared = require('./karma-shared.conf');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([
  //extra testing code
  //
    'test/bower_components/sinon/lib/sinon.js',
    'test/bower_components/sinon/lib/sinon/call.js',
    'test/bower_components/sinon/lib/sinon/spy.js',
    'test/bower_components/sinon/lib/sinon/stub.js',
    'test/bower_components/jasmine-sinon/lib/jasmine-sinon.js',

    //test files
    'test/unit/**/*.js'
  ]);
};

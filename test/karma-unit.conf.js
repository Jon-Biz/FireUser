// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

'use strict';

var shared = require('./karma-shared.conf');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([
  //extra testing code
  //
    'bower_components/sinon/lib/sinon.js',
    'bower_components/sinon/lib/sinon/call.js',
    'bower_components/sinon/lib/sinon/spy.js',
    'bower_components/sinon/lib/sinon/stub.js',
    'bower_components/jasmine-sinon/lib/jasmine-sinon.js',

    //test files
    'test/unit/mocks/**/*.js',
    'test/unit/**/*.js'
  ]);
};

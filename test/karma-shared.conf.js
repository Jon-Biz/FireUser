// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

var shared = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    reporters:['progress'],

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9876,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors:true

  });
};

shared.files = [
    // 'test/bower_components/jquery/jquery.js',
    // 'test/bower_components/bootstrap/dist/js/bootstrap.js',

    'test/bower_components/angular/angular.js',
    // 'test/bower_components/angular-route/angular-route.js',

    'test/bower_components/angular-mocks/angular-mocks.js',
//    'test/bower_components/firebase/firebase.js',
//    'test/bower_components/angularfire/angularFire.js',
    'fireUser.js'
  ];

module.exports = shared;

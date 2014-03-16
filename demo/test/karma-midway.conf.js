var shared = require('./karma-shared.conf');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([
    //extra testing code
    'app/bower_components/ngMidwayTester/src/ngMidwayTester.js',

    //test files
    'app/scripts/**/*.spec.**midway.js'
  ]);

};
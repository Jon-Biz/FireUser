/* global Firebase: true */
'use strict';

angular.module('fireUser', ['firebase'])
.constant('FBURL', 'https://schmoozr-dev.firebaseio.com/')
.service('$fireUser', ['$firebaseAuth', '$rootScope', '$location', 'FBURL',
  function ($firebaseAuth, $rootScope, $location, FBURL) {

    var firebaseRef = new Firebase(FBURL);

    $rootScope.auth = $firebaseAuth(firebaseRef, {'path': '/login'});

    $rootScope.$on('$firebaseAuth:error', function(err) {
      console.log('There was an error during authentication.', err);
    });


    $rootScope.$on('$firebaseAuth:login', function(evt, user) {
      console.log($rootScope.auth);
      console.log('logged in');
      $rootScope.visible = true;

      var greeting = 'Welcome ' +
        ($rootScope.auth.user.displayName || $rootScope.auth.user.email) + '!';
      $rootScope.userdata = {
        'themes': [{name: 'howard', style:0, greeting: greeting}],
        'theme': 0
      };

      $rootScope.$broadcast('data:loaded');

      if(angular.equals($location.path(), '/login')){
        $location.path('/');
      }

      $rootScope.visible = true;
    });

    this.newUser = function (user) {
      $rootScope.auth.$createUser(user.email, user.password, function(error, user) {
        if (!error) {
          console.log('Success - User Id: ' + user.id + ', Email: ' + user.email);
        } else {
          console.log(error);
        }
      });
    };

    this.login = function (user) {
      $rootScope.auth.$login('password',{
        email: user.email,
        password: user.password
      });
    };

    this.loginCustom = function(type) {
      $rootScope.auth.$login(type);
    };

    this.logout = function() {
      $rootScope.auth.$logout();
    };

    return this;
  }
]);

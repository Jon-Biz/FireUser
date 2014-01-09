'use strict';

// TODO: allow users to set:
//  - redirect URL on login success
//  - $rootScope var that stores data
//  - FBURL

angular.module('fireUser', ['firebase'])
.directive('fireuserlogingithub',function () {
  return {
    template: '<i />',
    restrict:'E',
    link:function ($scope,element,attr) {
        element.addClass('fa');
    }
  }
})
.constant('FBopts', {
  url:'https://schmoozr-dev.firebaseio.com/',
  redirectPath:'/login',
  datalocation:'/userdata'
})
.service('$fireUser', ['$firebaseAuth', '$firebase', '$rootScope', '$location', 'FBOpts', '$log',
  function ($firebaseAuth, $firebase, $rootScope, $location, FBOpts, $log) {
    // Possible events broadcasted by this service
    this.USER_CREATED_EVENT = 'fireuser:user_created';
    this.LOGIN_EVENT = 'fireuser:login';
    this.LOGIN_ERROR_EVENT = 'fireuser:login_error';
    this.LOGOUT_EVENT = 'fireuser:logout';
    this.USER_DATA_CHANGED_EVENT = 'fireuser:data_changed';
    this.USER_DATA_LOADED_EVENT = 'fireuser:data_loaded';
    this.USER_CREATION_ERROR_EVENT = 'fireuser:user_creation_error';


    // kickoff the authentication call (fires events $firebaseAuth:* events)
    var auth = $firebaseAuth(new Firebase(FBOpts.url), {'path': FBOpts.redirectPath});
    var self = this;
    var unbind = null;
    var _angularFireRef = null;

    $rootScope.$on('$firebaseAuth:logout', function() {
      $rootScope.$broadcast(self.LOGOUT_EVENT);
    });

    $rootScope.$on('$firebaseAuth:error', function(err) {
      $rootScope.$broadcast(self.LOGIN_ERROR_EVENT);
      $log.info('There was an error during authentication.', err);
    });

    $rootScope.$on('$firebaseAuth:login', function(evt, user) {

      $location.path('/');
      var FirebaseUrl = new Firebase(FBOpts.url + FBOpts.datalocation + user.id);
      var _angularFireRef = $firebase(FirebaseUrl);
      $rootScope.userdata = angular.copy(_angularFireRef);
      
      _angularFireRef.$bind($rootScope, 'userdata').then(function(unb) {
        unbind = unb;
      });

      $rootScope.userdata.$on('loaded', function(data) {
        $rootScope.$broadcast(self.USER_DATA_LOADED_EVENT, data);
      });

      $rootScope.userdata.$on('change', function(data) {
        $rootScope.$broadcast(self.USER_DATA_CHANGED_EVENT, data);
      });

      $rootScope.$broadcast(self.LOGIN_EVENT, user);
    });

    this.newUser = function (user) {
      auth.$createUser(user.email, user.password, function(error, user) {
        if (!error) {
          $rootScope.$broadcast(self.USER_CREATED_EVENT);
          $log.info('User created - User Id: ' + user.id + ', Email: ' + user.email);
        } else {
          $rootScope.$broadcast(self.USER_CREATION_ERROR_EVENT);
          $log.error(error);
        }
      });
    };

    this.login = function (user) {
      auth.$login('password',{
        email: user.email,
        password: user.password
      });
    };

    this.loginCustom = function(type) {
      auth.$login(type);
    };

    this.logout = function() {
      auth.$logout();
      $location.path('/login');
      unbind();
    };
  return this;
  }
])
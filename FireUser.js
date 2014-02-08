'use strict';

// TODO: allow users to set:
//  - redirect URL on login success
//  - $rootScope var that stores data
//  - FBURL

angular.module('fireUser', ['firebase'])
.constant('FireUserDefault', {
  redirectPath:'/',
  datalocation:'data',
  userdata:'user',
  iconCss:'fontawesome'
})
.service('FireUserValues',['FireUserDefault','FireUserConfig',function (FireUserDefault,FireUserConfig) {
  FireUserConfig = angular.extend(FireUserDefault,FireUserConfig);
  return FireUserConfig;
}])
.service('$fireUser', ['$firebaseAuth', '$firebase', '$rootScope', 'FireUserValues','$log',
  function ($firebaseAuth, $firebase, $rootScope, FireUserValues, $log) {

    // create data scope 
    $rootScope[FireUserValues.datalocation] = {}

    // Possible events broadcasted by this service
    this.USER_CREATED_EVENT = 'fireuser:user_created';
    this.LOGIN_EVENT = 'fireuser:login';
    this.LOGIN_ERROR_EVENT = 'fireuser:login_error';
    this.LOGOUT_EVENT = 'fireuser:logout';
    this.USER_DATA_CHANGED_EVENT = 'fireuser:data_changed';
    this.USER_DATA_LOADED_EVENT = 'fireuser:data_loaded';
    this.USER_CREATION_ERROR_EVENT = 'fireuser:user_creation_error';


    // kickoff the authentication call (fires events $firebaseAuth:* events)
    var auth = $firebaseAuth(new Firebase(FireUserValues.url), {'path': FireUserValues.redirectPath});
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

      var FirebaseUrl = new Firebase(FireUserValues.url + FireUserValues.datalocation + '/' + user.id);

      var _angularFireRef = $firebase(FirebaseUrl);

      var datalocation = FireUserValues.datalocation+'.'+FireUserValues.userdata;
      _angularFireRef.$bind($rootScope, datalocation).then(function(unb) {
        unbind = unb;
      });

      _angularFireRef.$on('loaded', function(data) {
        $rootScope.$broadcast(self.USER_DATA_LOADED_EVENT, data);
      });

      _angularFireRef.$on('change', function(data) {
        $rootScope.$broadcast(self.USER_DATA_CHANGED_EVENT, data);
      });

      $rootScope.$broadcast(self.LOGIN_EVENT, user);
    });

    this.createUser = function (user) {

      var userCreationSuccess = function () {
        $rootScope.$broadcast(self.USER_CREATED_EVENT);
        $log.info('User created - User Id: ' + user.id + ', Email: ' + user.email);
      }

      var userCreationError = function (error) {
        $rootScope.$broadcast(self.USER_CREATION_ERROR_EVENT);
        $log.error(error);
      }

      var createUser = auth.$createUser(user.email, user.password).promise
        .then(userCreationSuccess,userCreationError);

      return createUser;
    };

    this.login = function(type,user) {

      if(type === 'password'){
        auth.$login('password',{
          email: user.email,
          password: user.password
        });
      } else {
        auth.$login(type);
      }
    };

    this.logout = function() {
      unbind();
      auth.$logout();
    };

    this.changepassword = function (email, oldPassword, newPassword,callback) {
      auth.changePassword(email, oldPassword, newPassword, callback);
    };

    this.sendPasswordResetEmail =function ( email, callback ) {
      auth.sendPasswordResetEmail(email,callback);
    };

    return this;
  }
])
.directive('fireuserlogin', ['FireUserValues', function(FireUserValues) {
    return {
      scope:{
        type:'@'
      },
      replace: true,
      template: '<i ng-click="login(type)"></i>',
      controller:['$scope','$fireUser',function ($scope, $fireUser) {
        $scope.login = $fireUser.login;
      }],
      link: function ($scope,element,attr,ctrl) {
        if(FireUserValues.iconCss === 'fontawesome'){
          element.addClass('fa fa-'+attr.type);
        } else {
          element.text = 'Log In with ' + attr.type;
        }
      },
      restrict: 'E'
    };
  }])
.directive('fireuserlogout', [function() {
    return {
      scope:{
        type:'@'
      },
      replace: true,
      template: '<div ng-click="logout()">Logout</div>',
      controller:['$scope','$fireUser',function ($scope, $fireUser) {
        $scope.logout = $fireUser.logout;
      }],
      restrict: 'E'
    };
  }])
.directive('fireuserloginform', ['$compile', 'FireUserValues', function ($compile,FireUserValues) {
  return {
    scope:{},
    restrict:'E',
    controller:['$scope', '$fireUser', function ($scope, $fireUser) {

      $scope.login = function () {
        $fireUser.login('password',{ email: $scope.email, password: $scope.password });
      };

    }],
    link:function ($scope,element,attr,ctrl) {
      element.html(
        '<form id="loginForm" name="loginForm" ng-submit="login()">'+
          '<formgroup>'+
            'Email <input class="form-control" type="email" name="email" ng-model="email" required/>'+
          '</formgroup>'+
          '<formgroup>'+
            'Password <input class="form-control" type="text" name="password" ng-model="password" required/>'+
          '</formgroup>'+
          '<br />'+
          '<button id="submitBtn" class="btn btn-primary pull-right" type="submit" value="login">Log in</button>'+
        '</form>'
      );
      $compile(element.contents())($scope);
    }
  };
}])
.directive('fireusersignupform', ['$compile', 'FireUserValues', function ($compile,FireUserValues) {
  return {
    scope:{},
    restrict:'E',
    controller:['$scope', '$fireUser', function ($scope, $fireUser) {

      $scope.createUser = function () {
        $fireUser.createUser({ email: $scope.email, password: $scope.password });
      };

    }],
    link:function ($scope,element,attr,ctrl) {
      element.html(
        '<form name="signupForm" ng-submit="createUser()">'+
          '<formgroup>'+
            'Email <input class="form-control" type="email" name="email" ng-model="email" required/>'+
          '</formgroup>'+
          '<formgroup>'+
            'Password <input class="form-control" type="text" name="password" ng-model="password" required/>'+
          '</formgroup>'+
        '  <br />'+
        '  <button type="submit" class="btn btn-primary pull-right" value="creatUser">Sign Up</button>'+
        '  <span class="error" ng-show="error">{{error}}</span>'+
        '</form>'
      );
      $compile(element.contents())($scope);
    }
  };
}]);

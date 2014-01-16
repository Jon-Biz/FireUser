'use strict';

// TODO: allow users to set:
//  - redirect URL on login success
//  - $rootScope var that stores data
//  - FBURL

angular.module('fireUser', ['firebase'])
.constant('FireUserDefault', {
  redirectPath:'/login',
  datalocation:'/userdata/',
})
.value('FireUserConfig',{})
.run(['FireUserDefault','FireUserConfig',function (FireUserDefault,FireUserConfig) {
  FireUserConfig = angular.extend(FireUserDefault,FireUserConfig);
}])
.service('$fireUser', ['$firebaseAuth', '$firebase', '$rootScope', '$location', 'FireUserConfig','$log',
  function ($firebaseAuth, $firebase, $rootScope, $location, FireUserConfig, $log) {

    // Possible events broadcasted by this service
    this.USER_CREATED_EVENT = 'fireuser:user_created';
    this.LOGIN_EVENT = 'fireuser:login';
    this.LOGIN_ERROR_EVENT = 'fireuser:login_error';
    this.LOGOUT_EVENT = 'fireuser:logout';
    this.USER_DATA_CHANGED_EVENT = 'fireuser:data_changed';
    this.USER_DATA_LOADED_EVENT = 'fireuser:data_loaded';
    this.USER_CREATION_ERROR_EVENT = 'fireuser:user_creation_error';


    // kickoff the authentication call (fires events $firebaseAuth:* events)
    var auth = $firebaseAuth(new Firebase(FireUserConfig.url), {'path': FireUserConfig.redirectPath});
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
      var FirebaseUrl = new Firebase(FireUserConfig.url + FireUserConfig.datalocation + user.id);
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
    this.login = function(type,user) {
      if(type == 'password'){
        auth.$login('password',{
          email: user.email,
          password: user.password
        });        
      } else {
        auth.$login(type);
      }
    };

    this.logout = function() {
      auth.$logout();
      $location.path('/login');
      unbind();
    };
  return this;
  }
])
.directive('fireuserlogin', function(FireUserConfig) {
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
        if(FireUserConfig.iconCss="fontawesome"){
          element.addClass('fa fa-'+attr.type);        
        } else {
          element.text = "Log In With" + attr.type;
        }
      },
      restrict: 'E' 
    };
  })
.directive('fireuserlogout', function() {
    return {
      scope:{
        type:'@'
      },
      replace: true,
      template: '<div ng-click="logout()">Logout</div>',
      controller:['$scope','$fireUser',function ($scope, $fireUser) {
        $scope.login = $fireUser.logout;
      }],
      restrict: 'E' 
    };
  })
.directive('fireuserloginform',function ($compile,FireUserConfig) {
  return {
    scope:{},
    restrict:'E',
    controller:['$scope', '$fireUser', function ($scope, $fireUser) {

      $scope.login = function () {
        $fireUser.login('password',{ email: $scope.email, password: $scope.password });
      }

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
          '<div class="pull-right">'+
            '<button id="submitBtn" class="btn" type="submit" value="Log in">Log in</button>'+
          '</div>'+
        '</form>'
      )
      $compile(element.contents())($scope);
    }
  }
})
.directive("fireusersignupform",function ($compile,FireUserConfig) {
  return {
    scope:{},
    restrict:'E',
    controller:['$scope', '$fireUser', function ($scope, $fireUser) {

      $scope.createUser = function () {
        $fireUser.newUser({ email: $scope.email, password: $scope.password });
      }

    }],
    link:function ($scope,element,attr,ctrl) {
      element.html(
        '<form name="signupForm" ng-submit="createUser()">'+
        '  <forminput title="Name" type="text" />'+
        '  <forminput title="Email" type="email" />'+
        '  <forminput title="Password" type="password" />'+
        '  <br />'+
        '  <button type="submit" class="btn btn-primary pull-right">Sign Up</button>'+
        '  <span class="error" ng-show="error">{{error}}</span>'+
        '</form>'
      )
      $compile(element.contents())($scope);
    }
  }
})
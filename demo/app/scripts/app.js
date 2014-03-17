'use strict';

angular.module('fireUser').value('FireUserConfig',{
    url:"https://fireuser.firebaseio.com/",
    redirectPath:'/login',
    datalocation:"FireUser",
    userdata:"data",
    routing:true
    });

angular.module('FireUserDemo', ['fireUser','ui.router'])
  .run(function ($rootScope) {
    $rootScope.loginstate = false;

    $rootScope.$on('fireuser:login',function (evt,user) {      
      $rootScope.loginstate = true;
    })

    $rootScope.$on('fireuser:logout',function () {
      $rootScope.loginstate = false;

    })
  })
  .controller('Main',function ($scope,waitForAuth){

//   $scope.loginstatus = 'not logged in'    
    $scope.$watch('loginstate',function (newval,oldval) {
      if(newval){
        $scope.loginstatus = 'user '+$scope.data.userInfo.username+' logged in'              
      } else {
       $scope.loginstatus = 'not logged in'          
      }
    })

 

  })
  .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  
      $urlRouterProvider
        .when('','/')

      $stateProvider
        .state('home',{
          url:'/',
          templateUrl: 'views/home.html',
          controller: 'Main',
          private:true
        })
        .state('login',{
          url:'/login',
          templateUrl: 'views/home.html',
          controller: 'Main',
          private:false
        })

    }])

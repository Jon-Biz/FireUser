'use strict';

angular.module('fireUser').value('FireUserConfig',{
    url:"https://fireuser.firebaseio.com/",
    redirectPath:'/login',
    datalocation:"FireUser",
    userdata:"data",
    routing:true
    });


angular.module('FireUserDemo', ['fireUser','ui.router'])
  .controller('Main',function ($scope,waitForAuth,$state){
    waitForAuth.then(function () {

      $scope.createItem = function () {
        if(!$scope.data.user.items){
          $scope.data.user = {};
          $scope.data.user.items = []};

        $scope.data.user.items.push({'name':'new item'})
      }
      $scope.remove = function (item) {
        var items = $scope.data.user.items;
        for (var i = items.length - 1; i >= 0; i--) {
          if(items[i] == item) {
            items.splice(i,1);
          }
        };
      }

      $scope.$watch('data.userLoggedIn',function  (newVal,oldval) {
        var userInfo = $scope.data.userInfo
        if(!newVal){
          $state.go('login');
        }else{
          if(userInfo.provider == "password"){
            $scope.loginstatus = 'User '+$scope.data.userInfo.email+' logged in'              
          }else{
            $scope.loginstatus = 'User '+$scope.data.userInfo.username+' logged in'              
          }
        }
      })
    })
  })
  .controller('Login',function ($scope,waitForAuth,$state){

    $scope.$watch('data.userLoggedIn',function  (newVal,oldval) {
      if(newVal){
        $state.go('home');
      }
    })
  })
  .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  
      $urlRouterProvider
        .when('','/')

      $stateProvider
        .state('home',{
          url:'/',
          templateUrl: 'views/main.html',
          controller: 'Main',
          private:true
        })
        .state('login',{
          url:'/login',
          templateUrl: 'views/login.html',
          controller: 'Login',
          private:false
        })

    }])

#FireUser
##User management boilerplate for Angularjs & Firebase

FireUser is a user management module for Angular Firebase applications.  

Configure FireUser with your firebase URL and data location, drop some of the accompanying directives into your app, and you are storing your users' data in your firebase database. FireUser now also handles routing permissions and redirection, so you can direct users to login before gaining access to parts of your site.

FireUser handles user registration, login and databinding and includes directives supporting Firebase's email based login and third party login provider methods (ie - Github, Facebook, Twitter). These directives are skinned with Bootstrap and the FontAwesome css icon library. The controllers are also available, so you can include them in your own directives.

There is a simple demo here:

http://glaring-fire-5689.firebaseapp.com/

You can log in with github, twitter, or create an account with an email address and password. After login, you will be redirected to the main page, where a text field appears that persists between logins.

## What's New in version 0.4.0

*Major Changes*
- integration with angular-ui-router state-based routing
- separated controllers from directives for inclusion in other directives

*Breaking Changes!*

- refactor 
  - directive namespace from `fireuserXXX` to `fuXXX`
  - In fireUserConfig:
    - `userdata` to `userData`
    - `datalocation` to `dataLocation`

*Minor Changes*
- removed icon source specification from configuration file.

## Installation
Install via bower

	bower install fireuser --save

Or clone this repo. 

You will also need to include the [Angularfire and firebase.js](https://www.firebase.com/quickstart/angularjs.html) and [Firebase simple login](https://github.com/firebase/firebase-simple-login/) libraries in your application. 

If you want to use the accompanying directives, the [Fontawesome css icon library](http://fontawesome.io/) (for the github, facebook, twitter logins), and [Bootstrap](http://getbootstrap.com/) (for the email login forms).

If you intend to use FireUser to limit parts of your site to logged in users only, you will need angular ui's [state based router](https://github.com/angular-ui/ui-router). 

## Setup

Like any angular module, you will need to add a reference to fireUser.
js, and specify module `fireUser` in your application's dependencies. 

Naturally, you'll also need to set up a [Firebase database](http://firebase.com) that you will be accessing. If you intend to use do use third party logins (ie facebook, github, or twitter), you will need to set up the application permission for these in firebase.

### FireUserConfig options value

With that out of the way, you need to specify your project's Firebase url. FireUser consumes an angular value service called `FireUserConfig` that holds this and other options you can set.

Here's a absolute minimal example of fireUser configuration:
  
	angular.module('fireUser').value('fireUserConfig',{
		url:"http://your/firebase/url/"
		});

All you need to specify is the Firebase url.

Here's one with all the optional configuration parameters set:

	angular.module('fireUser').value('fireUserConfig',{
		url:"http://your/firebase/url",
		redirectPath:'/',								
		routing: true,
		routeAccess: 'private',
		routeRedirect: 'login'
		dataLocation: "nameOfRootDataDir",	
		userData: "nameofuserdatalocation"

`url`: this is your firebase url. 

`redirectPath` This is the path you want Firebase's simple login to sent people to once they have logged in.

`routing` (boolean) Enabling this enables FireUser's to manage permissions of states of the angular-ui-router. States marked with the name under `RouteAccess` will redirected to the `redirectState` state.

`DataDir` *(optional)*: this is the name of the data object you want to bind to your firebase data, and the name of the firebase data. Defaults to `data`

`Userdata` *(optional)*: this is where the user data should be stored within your data directory. It defaults to `user`. 

So, if both are left unspecified, user's data is made available from `$rootScope.data.user` and passes up through the scope inheritance chain. 

Once the user is logged in, the user's login information is placed in `userinfo` in the data directory. So, by default it would be accessible via `data.userinfo`. You can also evaluate the existence of this to determine where a user has logged in or now - ie `<div ng-show:'data.userinfo'>`

# Usage

## Directives

### Logging in

`<fuLogin type='yourloginproviderhere'/>` 

This creates an icon element, which, when clicked on, redirects them to their provider to get permissions. It will decorated with the fontawesome's css icon for that provider, so this:

	<fuLogin type='github' />

Will appear as this:
	<i class='fa fa-github' ></i>

In the browser's html.

If you want to use another icon set, include the associated controller (`fuLoginCtrlr`) in your directive.

### `<fuLoginForm />`

This directive provides a login form for email/password based logins. It uses bootstrap's css to output this:



### Logging out

### `<fuLogOut />`

This directive calls fu.logout() which unbinds your userdata location on the scope from Firebase, and calls Firebase auth's logout function.

### Signup

### `<fuSignUp />`

Creates a Signup Form with user name, password etc. Like the login form, it uses bootstrap.

##Routing
When a user accesses your page without being logged in, they are redirected to the `routeRedirect` state, which is the natural place for your login directives. Upon logging in, they are returned to the page the came from, or sent to the redirectState.

To set up routing, set `routing` to true in your configuration, and add `routeAccess` (defaults to 'private') as a boolean to each route you wish to redirect, set to true.

     $stateProvider
        .state('home',{
          url:'/',
          templateUrl: 'views/otherwise.html',
          controller: 'Main',
          private:true
        })
        .state('login',{
          url:'/login',
          templateUrl: 'views/test.html',
          controller: 'Main',
          private:false 
        })

###Events

Fireuser broadcasts the following events on $rootScope. 

`'fireuser:login'`

`'fireuser:login_error'`

`'fireuser:logout'`

`'fireuser:user_created'`

`'fireuser:data_changed'`

`'fireuser:data_loaded'`

`'fireuser:user_creation_error'`

`data_changed`,`data_loaded`,`'login'`,`'login_error'``'user_creation_error' all also include their respective data object, such as the error message returned, or that of the user who has just logged in.

## Controllers

If you want to build your own directives, include or `require` these controllers in your directive definition object. If you build directives using any popular css library, such as foundation, don't forget to share!

### `fuLoginCtrl`

`$scope.login(name, password)`

### `LogoutCtrl`

`$scope.logout()`

## FireUser Service API

####FireUser.LogIn(user)

User is a either a scope or an object containing `user.email` and `user.password`

####FireUser.LogOut()

Logs the user out.

####FireUser.NewUser(user)

User is either a scope or an object containing `user.email` or `user.password`

####FireUserSendPasswordResetEmail(emailaddress,callback)

Like the Firebase API it is wrapping, the callback should take two Boolean arguments - `error` and `success`.

## Demo

The demo app is included in this repo. Do a separate `bower install` within the demo directory and then serve `demo/app` (Httpster is quick and convenient). 

## Tests

To run the tests install the development dependencies via bower (`bower install --dev`)

To run the unit tests: run `grunt test:unit`
The demo app also includes E2E tests, using protractor. To run these: `grunt test:e2e


## About

FireUser was created by Jonathan El-Bizri and Austin Brown, two Angular js developers in San Francisco. Hire Us!

https://github.com/Jon-Biz
https://github.com/thataustin


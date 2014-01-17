#FireUser
##User management boilerplate for Angularjs & Firebase

FireUser is a user management module for Angular Firebase applications.  Configure FireUser with your firebase URL and data location, drop some of the accompanying directives into your app, and you are storing your users' data in your firebase database.

FireUser handles user registration, login and databinding, and includes directives for user management, Firebase's email based login and third party login provider methods (ie - Github, Facebook, Twitter). You can use these directives to add functionality quickly, or access the API directly with your own - the authentication API behaves identically to Firebase's auth library that is accessing, so if you are already familiar with Firebase, you already know how to use it.

## Installation
Install via bower

	bower install fireuser --save

Or clone this repo. You will also need to include the Angularfire and firebase.js libraries in your application.

## Setup

### FireUser options constant

Like any angular module, you will need to add a reference to fireUser.
js in your index.html, and specify module ````FireUser```` in your application's dependencies.

With that out of the way, you need to specify your project's Firebase url, where you want to place the data, and (optionally) third party secrets for facebook API. FireUser takes an angular Value service called ````FireUserConfig```` containing these options. 

Here's a minimal example of fireUser configuration:
  
	angular.module('FireUser').value('FireUserConfig',{
		FBurl:"http://your/firebase/url"
		};

All you need to specify is the url. 

Here's one with all optional configuration parameter:

	angular.module('FireUser').value('FireUserConfig',{
		FBurl:"http://your/firebase/url",
		DataDir: "nameOfRootDataDir",	
		iconCss: "fontawesome"
		})

````FBUrl````: this is your firebase url. 

````DataDir```` *(optional)*: this is the name of the data object you want to bind to your firebase data, and the name of the firebase data. Defaults to ````userdata````

````iconCss````: 'fontawesome'

iconCss specifies the icon font to use with the third party provider logins. Currently fontawesome is supported, with more to follow.

## Directives

### Logging in

````<FireUserLogin type='yourloginproviderhere'/>```` 

Use the Class configuration to specify the css that will display a font for login button. If you leave the ````iconCss```` empty, it will default to fontawesome css font library. So:

	<FireUserLogin type='github' />

	becomes

	<i class='fa fa-github' ></i>

### ````<FireUserLoginForm />````

This directive provides a login form for email/password based logins. 

### Logging out

### `<FireUserLogOut />`

This directive calls FireUser.logout() which unbinds your userdata location on the scope from Firebase, and calls Firebase auth's logout function.

### Signup

### `<FireUserSignUp />`

Creates a Signup Form with user name, password etc.

## API

The api wraps the angularfire modules access methods, so if you prefer to point your directives to that, you can do so.


####LogIn(user)

User is a either a scope or an object containing ````user.email```` and ````user.password````

####LogOut()

Logs the user out.

####NewUser(user)

User is either a scope or an object containing ````user.email```` or ````user.password````

## About

FireUser was created by Jonathan El-Bizri and Austin Brown, two Angular js developers in San Francisco.

https://github.com/Jon-Biz
https://github.com/thataustin


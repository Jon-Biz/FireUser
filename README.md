#FireUser

FireUser is a user management module for Angular Firebase applications. You provide FireUser with your firebase URL and call its api (login, logout), and FireUser handles 

###What does this provide me that I can't get directly from Firebase's AngularFire library?

AngularFire provides methods for logging users in and out and binding to data. FireUser encapsulates the user management process that AngularFire provides, so that all you have to worry about is configuring your firebase url, setting up authorized routes and including User Management directives.

FireUser comes with it's own set of directives, providing for registration and login in via Github, Facebook, or email, and logout. You can use these, or make your own 

By default, icon directives use the font awesome icon font, though you can override this with any class based behaviour, or just use them to wrap something else, such as text. Use these directives to add functionality quickly, or access the API directly with your own.

# Usage
## Installation

### bower

		bower install fireUser --save

### from github

	Clone this github directory 

## Setup

In addition to being referenced in your index.html and specified in your app's dependencies, you will need to configure FireUser with your FireBase url, data directroy, and, optionally third party secrets for facebook API.

You can provide your configuration details to FireUser one of two ways: by providing an options constant to the fireuser module, of by injecting them with $provider

### FireUser options constant

	angular.module('FireUser').constant('FBOpt',{
		FBurl:"http://your/firebase/url",
		DataDir: "nameOfRootData", //where you want
		scope: "yourscope", //defaults to rootScope
		githubsecret: "23232323", // optional
		githubiconclass: "fa fa-github"
		facebooksecret: "32323232", // optional
		facebookiconclass: "fa fa-facebook"
		gravatar: "4343"

		debug: true	// outputs error to console. defaults to false
		})

FBUrl: this is your firebase url. It does not include the DataDir

DataDir: this is the name of the data object you want to bind to your firebase data, and the name of the firebase data.

scope: this is the scope that you want to attached the data to. It defaults to rootscope

debug: outputs all errors to console. defaults to false

### By injecting the data via $provider


####auth secrets and auth icon classes

The auth secrets are your application authorization secret with the auth provider. The auth iconclass is a css class applied to your icon, defaulted to favicon. If you are using something else, then specify the class to be applied here.

## Setting up your routes

There's no point in having users log in if they can just wander about anywhere, now is it?



## Directives

FireUser provides several directives for imediately 

### Logging in

### `<FireUserLoginGithub />` or `<FireUserLoginGithub>...</FireUserLoginGithub>`
### `<FireUserLoginFacebook />` or `<FireUserLoginFacebook />...<FireUserLoginFacebook />`

These provide a button that 

### `<FireUserLogOut />`
### `<FireUserLogin />`


### `<FireUserSignUp />`


Creates a Signup Form with user name, password etc.

### `<FireChangePassword />`

## API

LogIn
LogOut
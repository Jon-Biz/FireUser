#FireUser

FireUser is a user management module for Angular Firebase applications. You provide FireUser with your firebase URL and call its api (login, logout), FireUser 

Additionally, directives are provided for registration and login in via Github, Facebook, or email. 

###What does this provide me that I can't get from Firebase's AngularFire library?

- github, facebook, etc , integration directives

Firebase Angular provides processes for logging users in and out (via FirebaseAuth), and accessing and binding to data. FireUser encapsulates this user management process, It even provides directives for registration and logging in and out via facebook, github or email, so you start using user data right away in your angular app.


# Usage


## Installation

### bower

### from github

## Setup

You can provide your configuration details to FireUser one of two ways: by providing an options constant to the fireuser module, of by injecting them with $provider

### FireUser options constant

	angular.module('FireUser').constant('FBOpt',{
		FBurl:"http://your/firebase/url",
		DataDir: "nameOfRootData", //where you want
		scope: "yourscope", //the scope that you want to attach the data to //defaults to rootScope
		Debug: true	// outputs error to console. defaults to false
		})

FBUrl: this is your firebase url. It does not include the DataDir

DataDir: this is the name of the data object you want to bind to your firebase data, and the name of the firebase data.

scope: this is the scope that you want to attached the data to. It defaults to rootscope

debug: outputs all errors to console. defaults to false




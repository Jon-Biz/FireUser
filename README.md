#FireUser

FireUser is a user management module for Angular Firebase applications.  Configure FireUser with your firebase URL and data location, drop some of the accompanying directives (````<FireUserLogin />````,````<FireUserLogout />```` etc) into your app and your users can create accounts and store their data in your firebase database.

FireUser includes directives for user management, Firebase's email login and federated login methods (ie - Github, Facebook, Twitter). 

By default, icon directives use the font awesome icon font, though you can override this with any class based behaviour, or just use them to wrap something else, such as text. Use these directives to add functionality quickly, or access the API directly with your own.

FireUser handles user registration, login and databinding. 
It encapsulates user management and sets up databinding.

# Usage
## Installation
Install via bower

	bower install fireUser --save

Or clone the repo this document is a part of.

## Setup

###Preparation

Like any angular project, add a reference to fireUser.js in your index.html, and specify module ````FireUser```` in your application's dependencies.

###Step1.

Now, you need to specify your project's Firebase url, where you want to place the data, and (optionally) third party secrets for facebook API. We'll do this by creating a contant in the Firebase module

Here's is an example fireUser configuration. Only FBUrl is required - the rest are optional.

### FireUser options constant

	angular.module('FireUser').constant('FBOpt',{
		FBurl:"http://your/firebase/url",
		DataDir: "nameOfRootDataDir",	
		scope: "yourscope",
		debug: true, 		
		githubSecret: "23232323"
		githubIconClass: "fa fa-github"
		facebookSecret: "32323232"
		facebookIconClass: "fa fa-facebook"
		twitterSecret: "23232323"
		twitterIconClass: "fa fa-github"

		gravatar: "4343"

		debug: true	// outputs error to console. defaults to false
		})

````FBUrl````: this is your firebase url. 

````DataDir```` *(optional)*: this is the name of the data object you want to bind to your firebase data, and the name of the firebase data. Defaults to ````userdata````

````scope```` *(optional)*: this is the scope that you want to attached the data to. It defaults to rootscope

````debug```` *(optional)*: outputs all errors to console. defaults to false

````githubSecret````, 
````facebookSecret````, 
````twitterSecret```` : If you are using the included FireUserLogin directives to provide login, provide your Application's secret here.

````githubIconClass````, 
````facebookIconClass````, 
````twitterIconClass```` :

Css Classes to be added to the contents of the login tag. This could be font icon specification, as above, or any css that you want to apply to a test based button.

A ````FireUserLogin```` directive without any text contents shows up as an icon tag ````<i></i>```` for use with font based icon sets. Apply any classes you need to specify your icon here. Keep in mind that you can also add class wherever you specify

## Directives

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
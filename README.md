#FireUser
##User management boilerplate for Angular Firebase

FireUser is a user management module for Angular Firebase applications.  Configure FireUser with your firebase URL and data location, drop some of the accompanying directives into your app and you are storing your users' data in your firebase database.

FireUser handles user registration, login and databinding, and includes directives for user management, Firebase's email based login and third party login provider methods (ie - Github, Facebook, Twitter). 

The authentication API behaves identically to Firebase's auth library it is accessing, if you are already familiar with Firebase, using fir

con directives use the font awesome icon font, though you can override this with any class based behaviour, or just use them to wrap something else, such as text. Use these directives to add functionality quickly, or access the API directly with your own.

## Installation
Install via bower

	bower install fireUser --save

Or clone the repo this document is a part of.

## Setup

### FireUser options constant

Like any angular project, you will need to add a reference to fireUser.
js in your index.html, and specify module ````FireUser```` in your application's dependencies.

With that out of the way, you need to specify your project's Firebase url, where you want to place the data, and (optionally) third party secrets for facebook API. FireUser takes an angular Value service called ````FireUserConfig```` containing these options. 

Here's a minimal example of fireUser configuration:
  
	angular.module('FireUser').value('FireUserConfig',{
		FBurl:"http://your/firebase/url"
		};

And here's one with every  optional configuration parameter:

	angular.module('FireUser').value('FireUserConfig',{
		FBurl:"http://your/firebase/url",
		DataDir: "nameOfRootDataDir",	
		scope: "yourscope",
		debug: true, 		
		githubSecret: "23232323",
		facebookSecret: "32323232",
		twitterSecret: "23232323",
		iconCss: "fontawesome"
		debug: false
		})

````FBUrl````: this is your firebase url. 

````DataDir```` *(optional)*: this is the name of the data object you want to bind to your firebase data, and the name of the firebase data. Defaults to ````userdata````

````scope```` *(optional)*: this is the scope that you want to attached the data to. It defaults to rootscope

````debug```` *(optional)*: outputs all errors to console. defaults to false

````githubSecret````
````facebookSecret````, 
````twitterSecret```` : If you are using the included FireUserLogin directives to provide login, provide your Application's secret here.

````iconCss````: 'fontawesome'

iconCss specifies the icon font to use with the third party provider logins. Currently fontawesome is supported, with more to follow.

## Directives

### Logging in

````<FireUserLogin type='yourloginproviderhere'/>```` 

If you leave the div empty, it will be turned into an <i>, for use with css based font icon libraries such as fontawesome. Specify the icon to be used by settin ````githubIconClass
If you don't use any text, the directive will assume you are using it as a font icon, and change the html to an icon - <i>. Use the Class configuration to specify the css that will display your font icon. If you leave the ````IconClass```` empty, it will default to fontawesome css font library. So:

	<FireUserLogin type='github' />

	becomes

	<i class='fa fa-github' ></i>

### ````<FireUserLoginForm />````

This directive

These provide a button that 
### Logging out

### `<FireUserLogOut />`

### Signup

### `<FireUserSignUp />`

Creates a Signup Form with user name, password etc.

### `<FireChangePassword />`

## API

The api wraps the angularfire modules access methods, so if you prefer to point your directives to that, you can do so.

````LogIn(user)````

User is a either a scope or an object containing ````user.email```` and ````user.password````

````LogOut()````

Logs the user out.

````NewUser(user)````

User is either a scope or an object containing ````user.email```` or ````user.password````

````LoginCustom````

# About

FireUser was created by Jonathan El-Bizri and Austin Brown, two Angular js developers in San Francisco

https://github.com/Jon-Biz
https://github.com/thataustin


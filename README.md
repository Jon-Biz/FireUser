#FireUser

FireUser is a user management module for Angular Firebase applications.  Configure FireUser with your firebase URL and data location, drop some of the accompanying directives (````<FireUserLogin />````,````<FireUserLogout />```` etc) into your app and store your users' data in your firebase database.

FireUser handles user registration, login and databinding, and includes directives for user management, Firebase's email login and federated login methods (ie - Github, Facebook, Twitter) (though naturally, you can create you own.)

con directives use the font awesome icon font, though you can override this with any class based behaviour, or just use them to wrap something else, such as text. Use these directives to add functionality quickly, or access the API directly with your own.

## Installation
Install via bower

	bower install fireUser --save

Or clone the repo this document is a part of.

## Setup

### FireUser options constant

Like any angular project, you will need to add a reference to fireUser.
js in your index.html, and specify module ````FireUser```` in your application's dependencies.

With that out of the way, you need to specify your project's Firebase url, where you want to place the data, and (optionally) third party secrets for facebook API. Do this by creating a contant in the Firebase module. 

Here's a minimal example fireUser configuration:

	angular.module('FireUser').constant('FBOpt',{
		FBurl:"http://your/firebase/url"
		};

And here's one with every  optional configuration parameter:

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

## Directives

### Logging in

````<FireUserLogin type='yourloginproviderhere'/>```` 

If you leave the div empty, it will be turned into an <i>, for use with css based font icon libraries such as fontawesome. 
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



### Messages

    this.USER_CREATED_EVENT = 'fireuser:user_created';
    this.LOGIN_EVENT = 'fireuser:login';
    this.LOGIN_ERROR_EVENT = 'fireuser:login_error';
    this.LOGOUT_EVENT = 'fireuser:logout';
    this.USER_DATA_CHANGED_EVENT = 'fireuser:data_changed';
    this.USER_DATA_LOADED_EVENT = 'fireuser:data_loaded';
    this.USER_CREATION_ERROR_EVENT = 'fireuser:user_creation_error';
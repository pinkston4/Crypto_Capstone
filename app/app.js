"use strict";

var app = angular.module("PuzzleApp", ["ngRoute"]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
	AuthFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			resolve();
		} else {
			reject();
		}
	});
});

app.config(($routeProvider) =>{
	$routeProvider
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
	})
	.when('/mainView', {
		templateUrl: 'partials/mainView.html',
		controller: 'MainViewCtrl'
	})
	.when('/profile', {
		templateUrl: 'partials/userProf.html',
		controller: 'ProfCtrl'
	})
	.when('/puzzle', {
		templateUrl: 'partials/puzzle.html',
		controller: 'PuzzleCtrl'
	})
	.otherwise('/login');
});

app.run( ($location, FBcreds) => {
	let creds = FBcreds;
	let authConfig = {
		apiKey: creds.key,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
});
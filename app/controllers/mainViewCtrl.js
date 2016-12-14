"use strict";

app.controller('MainViewCtrl', function($scope, AuthFactory, $window) {

	$scope.logOut = () => {
	AuthFactory.logoutUser()
	.then((logoutData)=>{
		console.log(logoutData);
		AuthFactory.isAuthenticated()
		.then((Authdata)=>{
			console.log(Authdata);
			$window.location.href = "#/login";
		});
	});
	};
});
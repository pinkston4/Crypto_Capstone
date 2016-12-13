"use strict";

app.controller('MainViewCtrl', function($scope, AuthFactory, $window) {

	$scope.logOut = () => {
	AuthFactory.logoutUser()
	.then(()=>{
		AuthFactory.isAuthenticated()
		.then(()=>{
			$window.location.href = "#/login";
		});
	});
	};
});
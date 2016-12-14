"use strict";

app.controller('LoginCtrl', function($scope, AuthFactory, UserFactory, $window, $location){
	$scope.account = {
		email: 'pinkstonjack2@gmail.com',
		password: 'password'
	};

	console.log("AuthFactory.getUser",AuthFactory.getUser());

	$scope.register = () => {
	AuthFactory.createUser($scope.account)
	.then((sumtin) => {
		$scope.account.uid = sumtin.uid;
	UserFactory.createFBUser($scope.account);
		console.log("sumtin",sumtin);
	});

	};


	$scope.login = () => {
	AuthFactory.loginUser($scope.account)
	.then((userData) => {
		console.log("user", userData);
		AuthFactory.isAuthenticated();
		$window.location.href = "#/mainView";
	});
	};
});
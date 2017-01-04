"use strict";

app.controller('LoginCtrl', function($scope, AuthFactory, UserFactory, $window, $location){
	$scope.account = {
		email: '',
		password: '',
		userName: '',
		bestTime: 1000000000000,
		totalAttempts: 0,
		totalComplete: 0,
		totalAbandoned: 0
	};

	console.log("AuthFactory.getUser",AuthFactory.getUser());

	$scope.register = () => {
	AuthFactory.createUser($scope.account)
	.then((sumtin) => {
		$scope.account.uid = sumtin.uid;
		console.log("sumtin",sumtin);
		UserFactory.createFBUser($scope.account)
		.then(() => {
			$scope.login();
		});
	});

	};


	$scope.login = () => {
	AuthFactory.loginUser($scope.account)
	.then((userData) => {
		console.log("user", userData);
		AuthFactory.isAuthenticated();
		$window.location.href = "#/puzzle";
	});
	};
});
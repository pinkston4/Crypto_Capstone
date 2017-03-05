"use strict";

app.controller('ProfCtrl', function($scope, ProfFactory) {

	ProfFactory.getUserStats()
	.then((stats) => {
		$scope.setValues(stats);
		$scope.setBestTime(stats);
	}).then(() => {
		$scope.$apply();
	});

	$scope.setValues = (stats) => {
		$scope.userName = stats[0].userName;
		$scope.totalComplete = stats[0].totalComplete;
		$scope.totalAbandoned = stats[0].totalAbandoned;
		$scope.totalAttempts = stats[0].totalAttempts;
	};

	$scope.setBestTime = (stats) => {
		let trueTime = stats[0].bestTime / 1000;
		let minutes = Math.floor(trueTime / 60);
		let seconds = (trueTime % 60);
		let trueSeconds = null;
		if(seconds < 10) {
			trueSeconds = '0' + String(Math.floor(seconds));
		} else{
			trueSeconds = String(Math.floor(seconds));
		}
		$scope.bestTime = minutes + ":" + trueSeconds;
	};

});
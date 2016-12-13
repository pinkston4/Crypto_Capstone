"use strict";

app.controller('PuzzleCtrl', function($scope, FactFactory) {
	FactFactory.getFacts();
});
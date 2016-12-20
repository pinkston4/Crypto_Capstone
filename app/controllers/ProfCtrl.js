"use strict";

app.controller('ProfCtrl', function($scope, ProfFactory) {
	ProfFactory.getUserStats();
});
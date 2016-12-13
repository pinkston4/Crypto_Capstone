"use strict";

app.controller('PuzzleCtrl', function($scope, FactFactory) {
	
	$scope.xtable = {
		a: 0,
		b: 1,
		c: 2,
		d: 3,
		e: 4,
		f: 5,
		g: 6,
		h: 7,
		i: 8,
		j: 9,
		k: 10,
		l: 11,
		m: 12,
		n: 13,
		o: 14,
		p: 15,
		q: 16,
		r: 17,
		s: 18,
		t: 19,
		u: 20,
		v: 21,
		w: 22,
		x: 23,
		y: 24,
		z: 25
	};

	console.log($scope.xtable);

	$scope.numberTxt = [];

	FactFactory.getFacts()
	.then((data) => {
		console.log('data:', data);
		$scope.factoid = data;
		console.log('$scope.factoid', $scope.factoid);
		$scope.letterVal($scope.factoid);
	});

	$scope.letterVal = (fact) => {
		console.log('fact', fact);
		for(var i = 0; i < fact.length; i++) {
			let newValue = $scope.getRepChar(fact[i]);
			$scope.numberTxt.push(newValue);
		}
		console.log($scope.numberTxt);
		// $scope.theMathPart();
	};

	$scope.getRepChar = (character) => {
		console.log(character);
		if(character == " ") {
			return character;
		}
			return $scope.xtable[character];
	};

	// $scope.theMathPart = () => {
	// 	for(var j = 0; j < $scope.numberTxt.length; j++){
	// 		if($scope.numberTxt[j] == " ") {
	// 			return $scope.numberTxt[j];
	// 		}
	// 	}
	// };



});

// functions to remember:
// f(x) = (ax + b) mod m
// d(x) = a^-1(x - b) mod m
// 1 = (a)(a^-1) mod m
// a must be co prime to m
// a^1 is the modular multiplicative inverse of a mod m 
// b is arbitrary 0-25 
// m is total length of alphabet so 26


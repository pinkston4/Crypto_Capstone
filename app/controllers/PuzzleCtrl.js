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
	
	$scope.zIndex = {
		1: 1,
		2: 3,
		3: 5,
		4: 7,
		5: 9,
		6: 11,
		7: 15,
		8: 17,
		9: 19,
		10: 21,
		11: 23,
		12: 25
	};

	$scope.originalString = '';
	$scope.cipherTxt = '';
	$scope.cipherTxtArray = [];
	$scope.numberTxt = [];
	$scope.encodedTxt = [];
	$scope.alpha = null;
	$scope.beta = null;
	$scope.new_obj = {};

	FactFactory.getFacts()
	.then((data) => {
		$scope.originalString = data;
		console.log('originalString:', $scope.originalString);
		$scope.letterVal($scope.originalString);
	}).then(() => {
		$scope.alphaBeta();
	}).then(() => {
		console.log("alpha:", $scope.alpha);
		console.log("beta:", $scope.beta);
		$scope.encode();
	}).then(() => {
		$scope.invert($scope.xtable);
	}).then(() => {
		console.log('new_obj:', $scope.new_obj);
		console.log("new_obj[0]:", $scope.new_obj[0]);
		$scope.createCipherTxt();
	});

//loop over the string, get the character, pass it to get replacement character, get the number value of character, push to array
	$scope.letterVal = (fact) => {
		for(let i = 0; i < fact.length; i++) {
			let newValue = $scope.getRepChar(fact[i]);
			$scope.numberTxt.push(newValue);
		}
	
	};
//if the character is a space return then, if not find the character in xtable and return its value
	$scope.getRepChar = (character) => {
		if(character == " ") {
			return character;
		}
			return $scope.xtable[character];
	};
//finds the values of alpha (any number coprime to m) and finds the number of b; b is arbitrary as long as a is not 1, cap b at 25 to counter act
	$scope.alphaBeta = () => {
		$scope.alpha = $scope.zIndex[Math.floor(Math.random() * 12 + 1)];
		$scope.beta = Math.floor(Math.random() * 25 + 1);
	};
//take the array of number values and loop over it, pass it to the math part to encode, push the new number to an array
	$scope.encode = () => {
		console.log("originalString to #:",$scope.numberTxt);
		for(let j = 0; j < $scope.numberTxt.length; j++) {
			let newNum = $scope.theMathPart($scope.numberTxt[j]);
			$scope.encodedTxt.push(newNum);
		}
		console.log("encodedTxt:", $scope.encodedTxt);
	};
// if the character is a space return then, otherwise it takes the number and runs it through this function, returns new value
	$scope.theMathPart = (refNum) => {
		if(refNum == " ") {
			return refNum;
		}
		return (($scope.alpha * refNum) + $scope.beta) % 26;
	};
//invert the xtable allowing easy access for creating ciphertxt
//invert was originally _.invert from underscore js
	$scope.invert = (obj) => {
	  for (let prop in obj) {
	    if(obj.hasOwnProperty(prop)) {
	      $scope.new_obj[obj[prop]] = prop;
	    }
	  }
	  return $scope.new_obj;
	};
//takes the new number value and finds the corresponding letter and creates new string
	$scope.createCipherTxt = () => {
		for(let i = 0; i < $scope.encodedTxt.length; i++) {
			let newChar = $scope.getRepCipher($scope.encodedTxt[i]);
			$scope.cipherTxtArray.push(newChar);
		}
		console.log("cipherTxtArray:", $scope.cipherTxtArray);
		$scope.cipherTxt = $scope.cipherTxtArray.join("");
		console.log("ciphertxt:", $scope.cipherTxt);
	};
	$scope.getRepCipher = (num) => {
		if(num == " ") {
			return num;
		}
		return $scope.new_obj[num];
	};


});

// functions to remember:
// f(x) = (ax + b) mod m
// d(x) = a^-1(x - b) mod m
// 1 = (a)(a^-1) mod m
// a must be co prime to m
// a^1 is the modular multiplicative inverse of a mod m 
// b is arbitrary 0-25 
// m is total length of alphabet so 26


"use strict";

app.controller('PuzzleCtrl', function($scope, FactFactory, $window, ProfFactory, AuthFactory) {
	
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
	$scope.decipheredTxt = '';
	$scope.cipherTxtArray = [];
	$scope.numberTxt = [];
	$scope.encodedTxt = [];
	$scope.decodedNum = [];
	$scope.originalTxtArray = [];
	$scope.alpha = null;
	$scope.beta = null;
	$scope.MMI = null;
	$scope.new_obj = {};
	$scope.start = null;
	$scope.end = null;
	$scope.milli = null;
	$scope.runTime = null;

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
		$scope.createCipherTxt();
	}).then(() => {
		$scope.ExtEuclAlg($scope.zIndex);
	}).then(() => {
		console.log("mmi:", $scope.MMI);
		$scope.decrypt();
	}).then(() => {
		console.log('decodedNum:', $scope.decodedNum);
		$scope.backToChar();
	}).then(() => {
		$scope.$apply();
		$scope.startTimer();
		$scope.addTallyAttempt();
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
		if(character === " ") {
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
		if(refNum === " ") {
			return refNum;
		}
		return (($scope.alpha * refNum) + $scope.beta) % 26;
	};
//invert the xtable allowing easy access for creating ciphertxt
//invert was originally _.invert from underscoreJS, copied and modified to meet need
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
		if(num === " ") {
			return num;
		}
		return $scope.new_obj[num];
	};

//finding the modular multiplicative inverse, x, of a mod m
	$scope.ExtEuclAlg = (obj) => {
		for(let prop in obj) {
			if((obj[prop] * $scope.alpha)%26 === 1) {
				$scope.MMI = obj[prop];
			}
		}
	};

//the decrypt function
	$scope.decrypt = () => {
		for(let i = 0; i < $scope.encodedTxt.length; i++) {
			let originalNum = $scope.theOtherMathPart($scope.encodedTxt[i]);
			$scope.decodedNum.push(originalNum);
		}
	};
	$scope.theOtherMathPart = (num) => {
		if(num === " ") {
			return num;
		}
		let newNum = $scope.MMI * (num - $scope.beta) % 26;
		if(Math.sign(newNum) === -1) {
			return newNum + 26;
		}
		return  newNum;
	};

//takes the deciphered numbers and changes it back to text
	$scope.backToChar = () => {
		for(let j = 0; j < $scope.decodedNum.length; j++) {
			let originalChar = $scope.getRepCipher($scope.decodedNum[j]);
			$scope.originalTxtArray.push(originalChar);
		}
		console.log('originalTxtArray:', $scope.originalTxtArray);
		$scope.decipheredTxt = $scope.originalTxtArray.join("");
		console.log("decipheredTxt:", $scope.decipheredTxt);
	};

//if the user cannot solve the puzzle and chooses to give up, the click the "give up button"
	$scope.giveUp = () => {
		$scope.cipherTxtArray = $scope.originalTxtArray;
		$scope.addTallyAbandoned();
		$scope.quiter();
	};

//check to see if the letter input matches the deciphered text
	$scope.checkYoSelf = ($event) => {
		let i = $event.currentTarget.id;
		if($event.which < 65 || $event.which > 90) {
			return;
		}
		let letter = String.fromCharCode($event.which).toLowerCase();
		if($scope.originalTxtArray[i] == letter) {
			$scope.allInstances(i, letter);
		} else {
			$(`#${i}`).removeClass('correct');
			$(`#${i}`).addClass('incorrect');
			$(`#${i}`).prop('value', "");
		}
	};

//if the guess was right find all instances of that letter 
	$scope.allInstances = (index, letter) => {
		let toCompare = $scope.cipherTxtArray[index];
		let newArray = [];
		let idx = $scope.cipherTxtArray.indexOf(toCompare);
		while (idx != -1) {
		  newArray.push(idx);
		  idx = $scope.cipherTxtArray.indexOf(toCompare, idx + 1);
		}
		$scope.allTheseAreRight(newArray, letter);
	};

//alter all instance of letter if it was correct
	$scope.allTheseAreRight = (correctArray, letter) => {
		for(let i = 0; i < correctArray.length; i++) {
			$(`#${correctArray[i]}`).removeClass('incorrect');
			$(`#${correctArray[i]}`).addClass('correct');
			$(`#${correctArray[i]}`).prop('value', letter);
			$(`#${correctArray[i]}`).prop('disabled', true);
		}
		$scope.IsItFin();
	};

//get a new puzzle
	$scope.getNewPuzzle = () => {	
		$window.location.reload();	
	};

//start the timer
	$scope.startTimer = () => {
		$scope.start = Date.now();
	};
//end time
	$scope.endTimer = () => {
		$scope.end = Date.now();
		$scope.totalTime();
	};
//the total time it took to solve the puzzle or give up
	$scope.totalTime = () => {
		$scope.milli = $scope.end - $scope.start;
		let trueTime = $scope.milli / 1000;
		let minutes = Math.floor(trueTime / 60);
		let seconds = trueTime % 60;
		let trueSeconds = null;
		if(seconds < 10) {
			trueSeconds = '0' + String(Math.floor(seconds));
		} else{
			trueSeconds = String(Math.floor(seconds));
		}
		$scope.runTime = minutes + ":" + trueSeconds;
		console.log("totalTime:", $scope.runTime);
		console.log('totalTime milliseconds:', $scope.milli);
		$scope.besTime();

	};

//check to see if the puzzle is complete
	$scope.IsItFin = () => {
		let newArray = [];
		for(let i = 0; i < $scope.cipherTxtArray.length; i++) {
			if($(`#${i}`).prop('disabled') === true) {
				newArray.push(i);
			}
		}
		if(newArray.length === $scope.cipherTxtArray.length) {
			$scope.endTimer();
			$scope.addTallyComplete();
			$scope.displayResults();
			$(`#giveUpBtn`).prop('disabled', true);
		}
	};

//Check to see if the user beet their best time
	$scope.besTime = () => {
		ProfFactory.getUserStats()
		.then((data) => {
			let currentBest = data[0].bestTime;
			if(currentBest > $scope.milli) {
				console.log("new best time");
				let newTime = {bestTime: $scope.milli};
				let id = data[0].id;
				ProfFactory.setUpdate(newTime, id);
			}
		});
	};
//add on a tally to the total number of attempts
	$scope.addTallyAttempt = () => {
		ProfFactory.getUserStats()
		.then((data) => {
			let currentNumAttempt = data[0].totalAttempts;
			let newNumAttempt = currentNumAttempt + 1;
			let newAttempts = {totalAttempts: newNumAttempt};
			let id = data[0].id;
			ProfFactory.setUpdate(newAttempts, id);
		});
	};

//add on a tally to abandoned if the user clicks give up
	$scope.addTallyAbandoned = () => {
		ProfFactory.getUserStats()
		.then((data) => {
			let currentNumAbandoned = data[0].totalAbandoned;
			let newNumAbandoned = currentNumAbandoned + 1;
			let newAbandoned = {totalAbandoned: newNumAbandoned};
			let id = data[0].id;
			ProfFactory.setUpdate(newAbandoned, id);
		});
	};

//add tally to completted if they complete the puzzle on their own
	$scope.addTallyComplete = () => {
		ProfFactory.getUserStats()
		.then((data) => {
			let currentNumComplete = data[0].totalComplete;
			let newNumComplete = currentNumComplete + 1;
			let newComplete = {totalComplete: newNumComplete};
			let id = data[0].id;
			ProfFactory.setUpdate(newComplete, id);
		});
	};

//display the final results for user
	$scope.displayResults = () => {
		$('#finalResults').html(`<h4>Your Final Time: ${$scope.runTime}</h4>
			<p>Click 'New Puzzle' for the next challenge!</p>`);
	};

//if the user clicked give up disable all inputs and display instructions 
	$scope.quiter = () => {
		$(`#giveUpBtn`).prop('disabled', true);
		$('#finalResults').html(`<h4>You Gave Up!</h4>
			<p>Click 'New Puzzle' for another challenge!<p>`);
		for(let i = 0; i < $scope.cipherTxtArray.length; i++) {
			$(`#${i}`).prop('disabled', true);
		}
	};

//logout function
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




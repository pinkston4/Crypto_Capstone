"use strict";

app.factory('UserFactory', function($http,AuthFactory,FBcreds){
	 

	 let createFBUser = (userObj) => {
	 	return new Promise ((resolve, reject) => {
	 		$http.post(`${FBcreds.URL}/users.json`,
	 		angular.toJson(userObj))
	 		.success((obj) => {
	 			console.log("objufactory :", obj);
	 			resolve(obj);
	 	})
	 		.error((error) => {
	 			reject(error);
	 	});
	 	
	 	});
	 };

	 return {createFBUser};

});
"use strict";

app.factory('FactFactory', function($http, FBcreds) {

	let getFacts = () => {
		let factNum = Math.floor(Math.random() * 5 + 1);
		return new Promise ((resolve, reject) => {
			$http.get(`${FBcreds.URL}/facts/${factNum}.json`)
			.success((data) => {
				// console.log("in FF.js, running getFacts", data);
				resolve(data);
			})
			.error((error) => {
				reject(error);
			});
		});
	};


	return {getFacts};
});
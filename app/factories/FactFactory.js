"use strict";

app.factory('FactFactory', function($http, FBcreds) {

	let getFacts = () => {
		return new Promise ((resolve, reject) => {
			$http.get(`${FBcreds.URL}/facts.json`)
			.success((data) => {
				console.log("in FF.js, running getFacts", data);
				resolve(data);
			})
			.error((error) => {
				reject(error);
			});
		});
	};

	return {getFacts};
});
"use strict";

app.factory('ProfFactory', function($http, FBcreds, AuthFactory) {


	let getUserStats = () => {
		let stats = [];
		return new Promise ((resolve, reject) => {
			let currentUser = AuthFactory.getUser();
			$http.get(`${FBcreds.URL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
			.success((obj) => {
				console.log('returnObj', obj);
				let objStats = obj;
				Object.keys(objStats).forEach((key) => {
					objStats[key].id = key;
					stats.push(objStats[key]);
				});
				console.log('stats', stats);
				resolve(stats);
			})
			.error((error) => {
				reject(error);
			});
		});
	};

	

	return{getUserStats};
});
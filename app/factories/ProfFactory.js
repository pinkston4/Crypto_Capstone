"use strict";

app.factory('ProfFactory', function($http, FBcreds, AuthFactory) {


	let getUserStats = () => {
		let stats = [];
		return new Promise ((resolve, reject) => {
			let currentUser = AuthFactory.getUser();
			$http.get(`${FBcreds.URL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
			.success((obj) => {
				let objStats = obj;
				Object.keys(objStats).forEach((key) => {
					objStats[key].id = key;
					stats.push(objStats[key]);
				});
				resolve(stats);
			})
			.error((error) => {
				reject(error);
			});
		});
	};

	let setUpdate = (newTime, id) => {
		return new Promise ((resolve, reject) => {
			$http.patch(`${FBcreds.URL}/users/${id}/.json`, angular.toJson(newTime))
			.success((data) => {
				resolve(data);
			})
			.error((error) => {
				reject(error);
			});
		});
	};

	

	

	return{getUserStats, setUpdate};
});


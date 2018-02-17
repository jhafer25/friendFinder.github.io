const path = require('path');
const friendsData = require('../data/friends.js');

module.exports = function(app) {

	// COMPLETE FRIENDS LIST
	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});

	// STORE NEW FRIEND
	app.post('/api/friends', function(req, res) {

		let newFriendInput = req.body;

		for(let i=0;i<newFriendInput.scores.length;i++){
			if(newFriendInput.scores[i] == "1 (Strongly Disagree)") {
				newFriendInput.scores[i] = 1;
			} else if(newFriendInput.scores[i] == "5 (Strongly Agree)") {
				newFriendInput.scores[i] = 5;
			} else {
				newFriendInput.scores[i] = parseInt(newFriendInput.scores[i]);
			}
		}

		let differencesArray = [];

		for(let i=0;i<friendsData.length;i++){

			let compareFriend = friendsData[i];
			let totalDifference = 0;
			
			for(let j=0;j<compareFriend.scores.length;j++) {
				let differenceOneScore = Math.abs(compareFriend.scores[j] - newFriendInput.scores[j]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		let newFriendFoundNumber = differencesArray[0];
		let newFriendFoundIndex = 0;

		for(let i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < newFriendFoundNumber) {
				newFriendFoundNumber = differencesArray[i];
				newFriendFoundIndex = i;
			}
		}

		friendsData.push(newFriendInput);

		res.json(friendsData[newFriendFoundIndex]);
	})
}
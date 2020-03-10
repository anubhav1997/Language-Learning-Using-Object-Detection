

import { database } from "./config/firebase";


// var database = firebase.database();

export default function writeUserData(userId, name, email, imageList) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    images : imageList
  });
}

export default function addImages(UserID, images){

	firebase.database().ref('users/'+ userID + 'images').update({
		images,
	});
}


import * as firebase from 'firebase';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import * as c from "./constants"

// Initialize Firebase
const config = {
    apiKey: c.FIREBASE_API_KEY,
    authDomain: c.FIREBASE_AUTH_DOMAIN,
    databaseURL: c.FIREBASE_DATABASE_URL,
    projectId: c.FIREBASE_PROJECT_ID,
    storageBucket: c.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// class Firebase {
//   constructor() {
//     firebase.initializeApp(config);
//     this.auth = firebase.auth();
//   }
// }

// export default Firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

console.log('loading firebase');

const config = {
  apiKey: "AIzaSyB-ceRToox5Crm6gkLbmHr75HVylUYAqy4",
  authDomain: "chat-app-fd7b4.firebaseapp.com",
  databaseURL: "https://chat-app-fd7b4.firebaseio.com",
  projectId: "chat-app-fd7b4",
  storageBucket: "chat-app-fd7b4.appspot.com",
  messagingSenderId: "1035201251217"
};
firebase.initializeApp(config);

export default firebase;
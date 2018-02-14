import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// add line-items for each reservation
const addReservation = (userId, description) => {
  db.collection('reservations').add({
    createdAt: timestamp,
    user: userId,
    description,
  });
};

// const listenForReservations = (userId, callback) => {

// }

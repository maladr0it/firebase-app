import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// add line-items for each reservation
export const createReservation = (userId, description) => {
  db.collection('reservations').add({
    createdAt: timestamp,
    user: userId,
    description,
  });
};
export const listenForReservations = (userId, callback) => {
  const unsubscribe = db.collection('reservations')
    .where('user', '==', userId).limit(10)
    .onSnapshot((snapshot) => {
      const changes = snapshot.docChanges.map(change => ({
        type: change.type,
        id: change.doc.id,
        data: change.doc.data(),
      }));
      const ids = snapshot.docs.map(doc => doc.id);
      callback(changes, ids);
    });
  return unsubscribe;
};

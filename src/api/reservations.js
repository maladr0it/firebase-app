import firebase, { firestore as db } from './firebase';

// eslint-disable-next-line import/no-named-as-default-member
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// add line-items for each reservation
export const createReservation = (userId, description) => {
  db.collection('reservations').add({
    createdAt: timestamp,
    reservationAt: null, // in order to show in sortBy(reservationAt)
    user: userId,
    description,
  });
};
export const updateReservation = (reservationId, data) =>
  db
    .collection('reservations')
    .doc(reservationId)
    .update({
      ...data,
    });
// return the delete promise so the
// front-end can await its completion
// TODO: consider this pattern for all db operations
export const deleteReservation = reservationId =>
  db
    .collection('reservations')
    .doc(reservationId)
    .delete();
export const listenForUserReservations = (userId, callback) => {
  const unsubscribe = db
    .collection('reservations')
    .where('user', '==', userId)
    .limit(25)
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
export const listenForAllReservations = (callback) => {
  const unsubscribe = db
    .collection('reservations')
    .orderBy('reservationAt')
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

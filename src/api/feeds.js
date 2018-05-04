import { firestore as db } from './firebase';

// const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const listenToUserChats = (userId, callback) => {
  const unsubscribe = db
    .collection(`users/${userId}/chats`)
    .orderBy('lastUpdated', 'desc')
    .limit(10)
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
export const listenToFilteredChats = (tagName, callback) => {
  const unsubscribe = db
    .collection('chats')
    .where(`tags.${tagName}`, '==', true)
    .orderBy('lastUpdated', 'desc')
    .limit(10)
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

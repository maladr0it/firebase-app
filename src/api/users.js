import firebase from './firebase';

const db = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// experimenting with storage
export const getAvatar = async filename => (
  storage.ref(filename).getDownloadURL()
);
export const getUser = async (userId) => {
  let userData = {};
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    userData = userDoc.data();
  } catch (e) {
    console.log(e);
  }
  return userData;
};
export const getUserByName = async (username) => {
  try {
    const snapshot = await db.collection('users')
      .where('username', '==', username).limit(1)
      .get();
    const { id } = snapshot.docs[0];
    const data = snapshot.docs[0].data();
    return { id, data };
  } catch (e) {
    console.log(e);
  }
  return undefined;
};
export const getUserIdByName = async (username) => {
  let userId = '';
  try {
    const snapshot = await db.collection('users')
      .where('username', '==', username).limit(1)
      .get();
    userId = snapshot.docs[0].id;
  } catch (e) {
    console.log(e);
  }
  return userId;
};
export const createUser = username => (
  db.collection('users').add({
    username,
    joinedAt: timestamp,
  })
);
export const setUserTypingStatus = (userId, chatId, isTyping) => {
  db.collection(`chats/${chatId}/users`).doc(`${userId}`)
    .update({
      isTyping,
    });
};
export const listenToChatForUsers = (chatId, callback) => {
  console.log(`chat ${chatId} is listening for users now`);
  const unsubscribe = db.collection(`chats/${chatId}/users`)
    .orderBy('joinedAt', 'desc')
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
export const listenToUser = (userId, callback) => {
  let unsubscribe;
  try {
    unsubscribe = db.collection('users').doc(userId)
      .onSnapshot((doc) => {
        callback(doc.data());
      });
  } catch (e) {
    console.log(e);
  }
  return unsubscribe;
};

// TODO: remove callback, use promise instead
export const listenToUserFilters = (userId, callback) => (
  db.collection(`users/${userId}/tags`)
    .onSnapshot((snapshot) => {
      const changes = snapshot.docChanges.reduce((acc, change) => {
        acc[change.type] = acc[change.type].concat({
          id: change.doc.id,
          data: change.doc.data(),
        });
        return acc;
      }, {});
      callback(changes);
    })
);
export const addUserFilter = (userId, filterName) => {

};

import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const getUser = async (userId) => {
  let userDocData = {};
  try {
    console.log(`Getting user ${userId}'s data`);
    const userDoc = await db.collection('users').doc(`${userId}`).get();
    userDocData = userDoc.data();
  } catch (e) {
    console.log(e);
  }
  return userDocData;
};
export const createUser = async username => (
  db.collection('users').add({
    username,
    dateJoined: timestamp,
  })
);
// naming is a little gross here?
// this should do a batch write!!

// select chat and set unread to 0
export const setSelectedChatForUser = (userId, chatId) => {
  db.collection('users').doc(`${userId}`)
    .update({
      selectedChatId: chatId,
    });
  db.collection(`users/${userId}/chats`).doc(`${chatId}`)
    .update({
      unreadCount: 0,
    });
};
export const setUserTypingStatus = (userId, chatId, isTyping) => {
  db.collection(`chats/${chatId}/users`).doc(`${userId}`)
    .update({
      isTyping,
    });
};
export const listenToChatForUsers = (chatId, callback) => {
  const unsubscribe = db.collection(`chats/${chatId}/users`)
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

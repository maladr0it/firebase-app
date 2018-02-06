import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const getUser = async (userId) => {
  let userDocData = {};
  try {
    const userDoc = await db.collection('users').doc(userId).get();
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
export const setSelectedChatForUser = (userId, chatId) => {
  db.collection('users').doc(`${userId}`)
    .update({
      selectedChatId: chatId,
    });
};
export const setUserTypingStatus = (userId, chatId, isTyping) => {
  db.collection(`chats/${chatId}/users`).doc(`${userId}`)
    .update({
      isTyping,
    });
};

import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

const addChatToUser = async (userId, chatId) => {
  const chatRef = db.collection(`users/${userId}/chats`).doc(`${chatId}`);
  try {
    await chatRef.set({
      lastUpdated: timestamp,
      unreadCount: 0,
    });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: added chat ${chatId} to user ${userId}`);
  return chatRef;
};
const addUserToChat = async (chatId, userId) => {
  const userRef = db.collection(`chats/${chatId}/users`).doc(`${userId}`);
  try {
    await userRef.set({
      joinedAt: timestamp, // not sure if this is needed
      // lastMessageRead: undefined // cannot set to undefined
    });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: added user ${userId} to chat ${chatId}`);
  return userRef;
};

// EXPORTS
export const addChatParticipant = async (chatId, userId) => {
  try {
    await Promise.all([
      addChatToUser(userId, chatId), // this is adding, then modifying
      addUserToChat(chatId, userId),
    ]);
    return;
  } catch (e) {
    console.log(e);
  }
};
export const createChat = async () => {
  const chatRef = await db.collection('chats')
    .add({
      createdAt: timestamp,
      // lastUpdated: timestamp
    });
  const chatSnapshot = await chatRef.get();
  console.log(`db: created new chat ${chatRef.id}`);
  return {
    chatId: chatRef.id,
    chatData: chatSnapshot.data(),
  };
};
export const listenToChatForUsers = (chatId, callback) => {
  // console.log(`db: creating listener for users of chat ${chatId}`);
  const unsubscribe = db.collection(`chats/${chatId}/users`)
    // .orderBy('joinedAt')
    .onSnapshot((snapshot) => {
      snapshot.docChanges.forEach((change) => {
        const userId = change.doc.id;
        const userData = change.doc.data();
        const changeType = change.type;
        callback(userId, userData, changeType);
      });
    });
  return unsubscribe;
};
export const listenForUserChatUpdates = (userId, snapshotCb, docChangeCb) => {
  // console.log(`db: creating listener for user ${userId}'s chats`);
  const unsubscribe = db.collection(`users/${userId}/chats`)
    .orderBy('lastUpdated', 'desc').limit(10)
    .onSnapshot((snapshot) => {
      // for adding/modifying data in the redux store
      snapshot.docChanges.forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const chatId = change.doc.id;
          const chatData = change.doc.data();
          const changeType = change.type;
          docChangeCb(chatId, chatData, changeType);
        }
      });
      // this must go second, as data may not have been added yet
      const chatIds = snapshot.docs.map(doc => doc.id);
      snapshotCb(chatIds);
    });
  return unsubscribe;
};


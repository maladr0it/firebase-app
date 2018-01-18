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
const removeChatFromUser = async (userId, chatId) => {
  const chatRef = db.collection(`users/${userId}/chats`).doc(`${chatId}`);
  try {
    await chatRef.delete();
  } catch (e) {
    console.log(e);
  }
  console.log(`db: removed chat ${chatId} from user ${userId}`);
  return chatRef;
};
const removeUserFromChat = async (chatId, userId) => {
  const userRef = db.collection(`chats/${chatId}/users`).doc(`${userId}`);
  try {
    await userRef.delete();
  } catch (e) {
    console.log(e);
  }
  console.log(`db: removed user ${userId} from chat ${chatId}`);
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
export const removeChatParticipant = async (chatId, userId) => {
  try {
    await Promise.all([
      removeChatFromUser(userId, chatId),
      removeUserFromChat(chatId, userId),
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
export const listenForUserChatUpdates = (userId, callback) => {
  const unsubscribe = db.collection(`users/${userId}/chats`)
    .orderBy('lastUpdated', 'desc').limit(10)
    .onSnapshot((snapshot) => {
      const changes = snapshot.docChanges.map(change => ({
        type: change.type,
        id: change.doc.id,
        data: change.doc.data(),
      }));
      // use 'ids' to quickly establish the order of chats for the view
      const ids = snapshot.docs.map(doc => doc.id);
      callback(changes, ids);
    });
  return unsubscribe;
};

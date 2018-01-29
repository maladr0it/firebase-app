import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

const addChatToUser = async (userId, chatId) => {
  try {
    await db.collection(`users/${userId}/chats`).doc(`${chatId}`).set({
      lastUpdated: timestamp,
      unreadCount: 0,
    });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: added chat ${chatId} to user ${userId}`);
};
const addUserToChat = async (chatId, userId) => {
  try {
    await db.collection(`chats/${chatId}/users`).doc(userId).set({
      joinedAt: timestamp,
    });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: added user ${userId} to chat ${chatId}`);
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
// should globally tagging a chat be called 'flagging'?
export const tagChat = (chatId, tagName) => {
  try {
    db.collection('chats').doc(chatId).update({
      [`tags.${tagName}`]: true,
    });
  } catch (e) {
    console.log(e);
  }
};
export const untagChat = (chatId, tagName) => {
  try {
    db.collection('chats').doc(chatId).update({
      [`tags.${tagName}`]: firebase.firestore.FieldValue.delete(),
    });
  } catch (e) {
    console.log(e);
  }
}
// TODO: is async needed here?
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
export const listenToChat = (chatId, callback) => {
  const unsubscribe = db.collection('chats').doc(chatId)
    .onSnapshot((doc) => {
      callback(doc.data());
    });
  return unsubscribe;
};

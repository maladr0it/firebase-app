import firebase, { firestore as db } from './firebase';

// eslint-disable-next-line import/no-named-as-default-member
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

const addChatToUser = async (userId, chatId) => {
  try {
    await db
      .collection(`users/${userId}/chats`)
      .doc(`${chatId}`)
      .set({
        lastUpdated: timestamp,
      });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: added chat ${chatId} to user ${userId}`);
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
const addUserToChat = (chatId, userId) => {
  try {
    db
      .collection(`chats/${chatId}/users`)
      .doc(userId)
      .set({
        isJoined: true,
        joinedAt: timestamp,
      });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: added user ${userId} to chat ${chatId}`);
};
const removeUserFromChat = (chatId, userId) => {
  try {
    db
      .collection(`chats/${chatId}/users`)
      .doc(userId)
      .update({
        isJoined: false,
      });
  } catch (e) {
    console.log(e);
  }
  console.log(`db: removed user ${userId} from chat ${chatId}`);
};
// EXPORTS
// should globally tagging a chat be called 'flagging'?
export const tagChat = (chatId, tagName) => {
  try {
    db
      .collection('chats')
      .doc(chatId)
      .update({
        [`tags.${tagName}`]: true,
      });
    console.log(`${chatId} tagged with ${tagName}`);
  } catch (e) {
    console.log(e);
  }
};
export const untagChat = (chatId, tagName) => {
  try {
    db
      .collection('chats')
      .doc(chatId)
      .update({
        [`tags.${tagName}`]: db.FieldValue.delete(),
      });
    console.log(`${chatId}'s tag ${tagName} removed`);
  } catch (e) {
    console.log(e);
  }
};
// TODO: is async needed here?
export const addChatParticipant = (chatId, userId) => {
  try {
    addChatToUser(userId, chatId); // ?? this is adding, then modifying
    addUserToChat(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
export const removeChatParticipant = (chatId, userId) => {
  try {
    removeChatFromUser(userId, chatId);
    removeUserFromChat(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
export const createChat = async () => {
  const chatRef = await db.collection('chats').add({
    createdAt: timestamp,
    lastUpdated: timestamp,
  });
  const chatSnapshot = await chatRef.get();
  console.log(`db: created new chat ${chatRef.id}`);
  return {
    chatId: chatRef.id,
    chatData: chatSnapshot.data(),
  };
};
export const listenToChat = (chatId, callback) => {
  const unsubscribe = db
    .collection('chats')
    .doc(chatId)
    .onSnapshot((doc) => {
      callback(doc.data());
    });
  return unsubscribe;
};

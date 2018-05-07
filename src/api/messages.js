import firebase, { firestore as db } from './firebase';

// eslint-disable-next-line import/no-named-as-default-member
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

const getChatUserIds = async (chatId) => {
  const chatUsersRef = db.collection(`chats/${chatId}/users`);
  let userIds = [];
  try {
    const chatUsersSnapshot = await chatUsersRef.get();
    userIds = chatUsersSnapshot.docs.map(doc => doc.id);
  } catch (e) {
    console.log(e);
  }
  return userIds;
};
const addMessageToChat = async (chatId, author, chatUserIds, text) => {
  const readStatus = {};
  chatUserIds.forEach((id) => {
    readStatus[id] = null;
  });
  const messageRef = await db.collection(`chats/${chatId}/messages`).add({
    author,
    createdAt: timestamp,
    readStatus,
    text,
  });
  return messageRef;
};
// here is where we should set the read status
const updateUserChat = async (userId, chatId) => {
  console.log(`updating ${userId}'s inbox`);
  db
    .collection(`users/${userId}/chats`)
    .doc(`${chatId}`)
    .update({
      lastUpdated: timestamp,
    });
};
const updateChat = (chatId) => {
  db
    .collection('chats')
    .doc(chatId)
    .update({
      lastUpdated: timestamp,
    });
};

// EXPORTS
export const sendMessage = async (chatId, userId, text) => {
  const chatUserIds = await getChatUserIds(chatId);
  const messageRef = await addMessageToChat(chatId, userId, chatUserIds, text);
  updateChat(chatId); // bump the chat
  chatUserIds.forEach(id => updateUserChat(id, chatId));

  const messageSnapshot = await messageRef.get();
  // console.log(`user ${userId} sent message '${text}' to chat ${chatId}`);
  const messagePayload = {
    messageId: messageRef.id,
    messageData: messageSnapshot.data(),
  };
  return messagePayload;
};
export const markMessagesAsRead = async (chatId, userId) => {
  const messagesSnapshot = await db
    .collection(`chats/${chatId}/messages`)
    .where(`readStatus.${userId}`, '==', null)
    .get();
  messagesSnapshot.forEach((snap) => {
    console.log('marking message as read');
    db
      .collection(`chats/${chatId}/messages`)
      .doc(`${snap.id}`)
      .update({
        [`readStatus.${userId}`]: timestamp,
      });
  });
};
export const listenToChatForMessages = (chatId, callback) => {
  // console.log(`db: creating listener for messages of chat ${chatId}`);
  const unsubscribe = db
    .collection(`chats/${chatId}/messages`)
    .orderBy('createdAt', 'desc')
    .limit(50)
    .onSnapshot((snapshot) => {
      const changes = snapshot.docChanges.map(change => ({
        type: change.type,
        id: change.doc.id,
        data: {
          ...change.doc.data(),
          isPending: change.doc.metadata.hasPendingWrites,
        },
      }));
      // reversed so newest messages are last
      const ids = snapshot.docs.map(doc => doc.id).reverse();
      callback(changes, ids);
    });
  return unsubscribe;
};

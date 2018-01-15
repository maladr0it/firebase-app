import firebase from './firebase';

const db = firebase.firestore();
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
const addMessageToChat = async (chatId, userId, chatUserIds, text) => {
  let messageRef;
  try {
    const readStatus = {};
    chatUserIds.forEach((id) => {
      readStatus[id] = null;
    });
    // get userIds here, add them to the readStatus as null
    messageRef = await db.collection(`chats/${chatId}/messages`).add({
      author: userId,
      createdAt: timestamp,
      readStatus: {
        ...readStatus,
        [userId]: timestamp,
      },
      text,
    });
  } catch (e) {
    console.log(e);
  }
  return messageRef;
};
const updateUserChat = async (userId, chatId) => {
  const userRef = db.collection('users').doc(`${userId}`);
  const chatRef = db.collection(`users/${userId}/chats`).doc(`${chatId}`);
  db.runTransaction(async (transaction) => {
    const [userDoc, chatDoc] = await Promise.all([
      transaction.get(userRef),
      transaction.get(chatRef),
    ]);
    // increment if user is not viewing the chat
    let unreadCount = chatDoc.data().unreadCount || 0;
    if (userDoc.data().selectedChatId !== chatId) {
      unreadCount += 1;
    }
    transaction.update(chatRef, {
      lastUpdated: timestamp,
      unreadCount,
    });
    transaction.update(userRef, {});
    // all docs read in a transaction must be written
  });
};

// EXPORTS
export const sendMessage = async (chatId, userId, text) => {
  let messagePayload = {};
  try {
    const chatUserIds = await getChatUserIds(chatId);
    const addMessageProm = addMessageToChat(chatId, userId, chatUserIds, text);

    chatUserIds.forEach(id => updateUserChat(id, chatId));
    const messageRef = await addMessageProm;
    const messageSnapshot = await messageRef.get();
    // console.log(`user ${userId} sent message '${text}' to chat ${chatId}`);
    messagePayload = {
      messageId: messageRef.id,
      messageData: messageSnapshot.data(),
    };
  } catch (e) {
    console.log(e);
  }
  return messagePayload;
};
export const markMessagesAsRead = async (chatId, userId) => {
  console.log('marking as read');
  const readStatusKey = `readStatus.${userId}`;
  const messagesSnapshot = await db.collection(`chats/${chatId}/messages`)
    .where(readStatusKey, '==', null)
    .get();
  messagesSnapshot.forEach((snap) => {
    console.log('unread detected');
    console.log(`modifying ${chatId}'s message ${snap.id}...`);
    db.collection(`chats/${chatId}/messages`).doc(`${snap.id}`)
      .update({
        [readStatusKey]: timestamp,
      });
  });
};
export const listenToChatForMessages = (chatId, callback) => {
  // console.log(`db: creating listener for messages of chat ${chatId}`);
  const unsubscribe = db.collection(`chats/${chatId}/messages`)
    .orderBy('createdAt', 'desc').limit(50)
    .onSnapshot((snapshot) => {
    // reversed so that earlier changes are processed first
      snapshot.docChanges.reverse().forEach((change) => {
        const messageId = change.doc.id;
        const messageData = {
          ...change.doc.data(),
          isPending: change.doc.metadata.hasPendingWrites,
        };
        const changeType = change.type;
        callback(messageId, messageData, changeType);
      });
    });
  return unsubscribe;
};


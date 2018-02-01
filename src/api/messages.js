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
const addMessageToChat = async (chatId, userId, username, chatUserIds, text) => {
  let messageRef;
  const readStatus = {};
  chatUserIds.forEach((id) => {
    readStatus[id] = null;
  });
  try {
    messageRef = await db.collection(`chats/${chatId}/messages`).add({
      author: userId,
      authorUsername: username,
      createdAt: timestamp,
      readStatus,
      text,
    });
  } catch (e) {
    console.log(e);
  }
  return messageRef;
};
// here is where we should set the read status
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
const updateChat = (chatId) => {
  try {
    db.collection('chats').doc(chatId)
      .update({
        lastUpdated: timestamp,
      });
  } catch (e) {
    console.log(e);
  }
};

// EXPORTS
export const sendMessage = async (chatId, userId, username, text) => {
  let messagePayload = {};
  try {
    const chatUserIds = await getChatUserIds(chatId);
    const messageRef = await addMessageToChat(chatId, userId, username, chatUserIds, text);
    updateChat(chatId);
    chatUserIds.forEach(id => updateUserChat(id, chatId));

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
  // marking unread as 0
  db.collection(`users/${userId}/chats`).doc(`${chatId}`)
    .update({
      unreadCount: 0,
    });

  const readStatusKey = `readStatus.${userId}`;
  const messagesSnapshot = await db.collection(`chats/${chatId}/messages`)
    .where(readStatusKey, '==', null)
    .get();
  messagesSnapshot.forEach((snap) => {
    console.log('marking message as read');
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


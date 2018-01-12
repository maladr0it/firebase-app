import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

console.log('db api loaded');

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
    console.log('///');
    console.log(timestamp);
  } catch (e) {
    console.log(e);
  }
  return messageRef;
};
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
// TODO: check this
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
// naming is a little gross here?
// this should do a batch write!!
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

// TRANSACTIONS/BATCHES
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
// TODO: refactor this
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

// has to update every user's chat feed
// optimisations here make the code ugly
// TODO: refactor try/catch block
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

// LISTENERS
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

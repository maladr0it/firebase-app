import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

console.log('db api loaded');

const addMessageToChat = async (chatId, userId, text) => {
  const messageRef = await db.collection(`chats/${chatId}/messages`);
  try {
    messageRef.add({
      author: userId,
      createdAt: timestamp,
      text,
    });
  } catch (e) {
    console.log(e);
  }
  return messageRef;
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

// has to update every user's chat feed
// optimisations here make the code ugly
// TODO: refactor try/catch block
export const sendMessage = async (chatId, userId, text) => {
  let messagePayload = {};
  try {
    const addMessageProm = addMessageToChat(chatId, userId, text);
    const chatUserIds = await getChatUserIds(chatId);
    // const usersToUpdate = chatUserIds.filter(id => id !== userId);

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
    .set({
      selectedChatId: chatId,
    }, { merge: true });
  db.collection(`users/${userId}/chats`).doc(`${chatId}`)
    .set({
      unreadCount: 0,
    }, { merge: true });
};
export const markUserAsTyping = (userId, chatId) => {
  console.log(`marking ${userId} as typing in chat ${chatId}`);
  db.collection(`chats/${chatId}/users`).doc(`${userId}`)
    .set({
      isTyping: true,
    }, { merge: true });
};

// LISTENERS
export const listenToChatForMessages = (chatId, callback) => {
  console.log(`db: creating listener for messages of chat ${chatId}`);
  const unsubscribe = db.collection(`chats/${chatId}/messages`)
    .orderBy('createdAt', 'desc').limit(50)
    .onSnapshot((snapshot) => {
    // reversed so that earlier changes are processed first
      snapshot.docChanges.reverse().forEach((change) => {
        if (change.type === 'added') {
          const messageId = change.doc.id;
          const messageData = change.doc.data();
          const isPending = change.doc.metadata.hasPendingWrites;
          callback(messageId, messageData, isPending);
        }
      });
    });
  return unsubscribe;
};
export const listenToChatForUsers = (chatId, callback) => {
  console.log(`db: creating listener for users of chat ${chatId}`);
  const unsubscribe = db.collection(`chats/${chatId}/users`)
  // .orderBy('joinedAt')
    .onSnapshot((snapshot) => {
      snapshot.docChanges.forEach((change) => {
        if (change.type === 'added') {
          const userId = change.doc.id;
          const userData = change.doc.data();
          callback(userId, userData);
        }
      });
    });
  return unsubscribe;
};
export const listenForUserChatUpdates = (userId, snapshotCb, docChangeCb) => {
  console.log(`db: creating listener for user ${userId}'s chats`);
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

import firebase from './firebase';

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

console.log('db api loaded');

const addMessageToChat = async (chatId, userId, text) => {
  try {
    const messageRef = await db.collection(`chats/${chatId}/messages`)
      .add({
        author: userId,
        createdAt: timestamp,
        text
      });
    return messageRef;
  } catch (e) {
    console.log(e);
  }
};
// TODO: refactor this
const updateUserChat = async (userId, chatId) => {
  const userRef = db.collection(`users`).doc(`${userId}`);
  const chatRef = db.collection(`users/${userId}/chats`).doc(`${chatId}`);
  db.runTransaction(async transaction => {
    const [userDoc, chatDoc] = await Promise.all([
      transaction.get(userRef),
      transaction.get(chatRef)
    ]);
    // increment if user is not viewing the chat
    let unreadCount = chatDoc.data().unreadCount || 0;
    if (userDoc.data().selectedChatId !== chatId) {
      unreadCount += 1;
    }
    transaction.update(chatRef, {
      lastUpdated: timestamp,
      unreadCount
    });
    transaction.update(userRef, {})
    // all docs read in a transaction must be written
  });
};
const addChatToUser = async (userId, chatId) => {
  try {
    const chatRef = await db.collection(`users/${userId}/chats`).doc(`${chatId}`)
      .set({
        lastUpdated: timestamp,
        unreadCount: 0
      });
    console.log(`db: added chat ${chatId} to user ${userId}`);
    return chatRef;
  } catch (e) {
    console.log(e);
  }
};
const addUserToChat = async (chatId, userId) => {
  try {
    const userRef = await db.collection(`chats/${chatId}/users`).doc(`${userId}`)
      .set({
        joinedAt: timestamp, // not sure if this is needed
        // lastMessageRead: undefined // cannot set to undefined
      });
    console.log(`db: added user ${userId} to chat ${chatId}`);
    return userRef;
  } catch (e) {
    console.log(e);
  }
};
const getChatUserIds = async chatId => {
  try {
    const chatUsersSnapshot = await db.collection(`chats/${chatId}/users`).get();
    return chatUsersSnapshot.docs.map(doc => doc.id);
  } catch (e) {
    console.log(e);
  }
};
export const getUser = async userId => {
  try {
    const userDoc = await db.collection(`users`).doc(`${userId}`).get();
    return userDoc.data();
  } catch (e) {
    console.log(e);
  }
};

// has to update every user's chat feed
// optimisations here make the code ugly
export const sendMessage = async (chatId, userId, text) => {
  try {
    const addMessageProm = addMessageToChat(chatId, userId, text);
    const chatUserIds = await getChatUserIds(chatId)
    // const usersToUpdate = chatUserIds.filter(id => id !== userId);

    chatUserIds.forEach(userId => updateUserChat(userId, chatId));
    const messageRef = await addMessageProm;
    const messageSnapshot = await messageRef.get();
    // console.log(`user ${userId} sent message '${text}' to chat ${chatId}`);
    return {
      messageId: messageRef.id,
      messageData: messageSnapshot.data()
    };
  } catch (e) {
    console.log(e);
  }
};
// naming is a little gross here?

// this should do a batch write!!
export const addChatParticipant = async (chatId, userId) => {
  try {
    await Promise.all([
      addChatToUser(userId, chatId), // this is adding, then modifying
      addUserToChat(chatId, userId)
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
    chatData: chatSnapshot.data()
  };
};

// select chat and set unread to 0
export const setSelectedChatForUser = (userId, chatId) => {
  db.collection(`users`).doc(`${userId}`)
    .set({
      selectedChatId: chatId
    }, { merge: true });
  db.collection(`users/${userId}/chats`).doc(`${chatId}`)
    .set({
      unreadCount: 0
    }, { merge: true });
};

// LISTENERS
export const listenToChatForMessages = (chatId, callback) => {
  console.log(`db: creating listener for messages of chat ${chatId}`);
  const unsubscribe = db.collection(`chats/${chatId}/messages`)
  .orderBy('createdAt', 'desc').limit(50) 
  .onSnapshot(snapshot => {
    // reversed so that earlier changes are processed first
    snapshot.docChanges.reverse().forEach(change => {
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
  .onSnapshot(snapshot => {
    snapshot.docChanges.forEach(change => {
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
  .onSnapshot(snapshot => {
    // for adding/modifying data in the redux store
    snapshot.docChanges.reverse().forEach(async change => {
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
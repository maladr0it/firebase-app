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
const updateUserChat = async (userId, chatId) => {
  try {
    const chatRef = await db.collection(`users/${userId}/chats`).doc(`${chatId}`)
      .set({
        lastUpdated: timestamp
      }, { merge: true });
    return chatRef;
  } catch (e) {
    console.log(e);
  }
};

// reconsider naming of 'chat' in user.
// it is simply to grab recently updated quickly
// 'chatFeed'?
const addChatToUser = async (userId, chatId) => {
  try {
    const chatRef = await db.collection(`users/${userId}/chats`).doc(`${chatId}`)
      .set({
        lastUpdated: timestamp,
        // numUnreadMessages
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
// we don't use the chat's actual lastUpdated
// NOW is accurate if user has just joined
export const sendMessage = async (chatId, userId, text) => {
  try {
    const [messageRef, ] = await Promise.all([
      addMessageToChat(chatId, userId, text),
      updateUserChat(userId, chatId)
    ]);
    const messageSnapshot = await messageRef.get();
    console.log(`user ${userId} sent message '${text}' to chat $${chatId}`);
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
// creates a chat on db, and returns the chatId and data
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




// TODO
// consider using async with these listeners to avoid callback complexity

// could instead return an array of results
// this will result in less action:ADD_MESSAGE calls in redux, too

// consider listening AFTER initial fetch? see inner comment
export const listenToChatForNewMessages = (chatId, callback) => {
  console.log(`db: creating listener for messages of chat ${chatId}`);
  db.collection(`chats/${chatId}/messages`)
  // luckily, null dates are 0, so they are included in this range..
  // TODO: consider a safer way.
  .orderBy('createdAt', 'desc').limit(10) 
  .onSnapshot(snapshot => {
    // reversed so that earlier changes are processed first
    snapshot.docChanges.reverse().forEach(change => {
      if (change.type === 'added') {
        const messageId = change.doc.id;
        const messageData = change.doc.data();
        const isPending = change.doc.metadata.hasPendingWrites;
        callback(messageId, messageData, isPending);
      }
    })
  });
};
export const listenToChatForNewUsers = (chatId, callback) => {
  console.log(`db: creating listener for users of chat ${chatId}`);
  db.collection(`chats/${chatId}/users`)
  // .orderBy('joinedAt')
  .onSnapshot(snapshot => {
    snapshot.docChanges.forEach(change => {
      if (change.type === 'added') {
        const userId = change.doc.id;
        callback(userId);
      }
    });
  });
};

// this needs to get chat data, not 'userChat'
export const listenForUserChatUpdates = (userId, callback) => {
  console.log(`db: creating listener for user ${userId}'s chats`);
  db.collection(`users/${userId}/chats`)
  // TODO: chats without lastUpdated are rendered...
  .orderBy('lastUpdated', 'desc').limit(3)
  .onSnapshot(snapshot => {
    snapshot.docChanges.forEach(async change => {
      if (change.type === 'added' || change.type === 'modified') {
        const chatId = change.doc.id;
        const changeType = change.type;
        callback(chatId, changeType);
      }
    });
  });
};
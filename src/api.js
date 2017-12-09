import firebase from './firebase';

const db = firebase.firestore();
console.log('db api loaded');


export const updateChat = async (chatId) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  
}

// TODO rethink try/catch block structure
// creates a message, returns the id and data
// MOVE EXTRA STUFF OUTSIDE THIS FUNCTION
export const createMessage = async (chatId, userId, text) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  try {
    const addMessagePromise = db.collection(`chats/${chatId}/messages`)
      .add({
        author: userId,
        createdAt: timestamp,
        text
      });
    const updateChatPromise = db.collection(`chats`).doc(`${chatId}`)
      .set({
        lastUpdated: timestamp
      }, { merge: true });

    // run both in parallel
    const [messageRef, chatRef] = await Promise.all([
      addMessagePromise, updateChatPromise
    ]);

    console.log(`db: user ${userId} added message "${text}" to chat ${chatId}`);
    const messageSnapshot = await messageRef.get()
    // ??? this won't have createdAt property. careful
    return {
      messageId: messageRef.id,
      messageData: messageSnapshot.data()
    };
  } catch (e) {
    console.log(e);
  }
};


// TODO
// consider using async with these listeners to avoid callback complexity

// could instead return an array of results
// this will result in less action:ADD_MESSAGE calls in redux, too

// consider listening AFTER initial fetch? see inner comment
export const listenToChatForNewMessages = (chatId, callback) => {
  console.log(`creating listener for chat ${chatId}`);
  db.collection(`chats/${chatId}/messages`)
  // luckily, null dates are 0, so they are included in this range..
  // TODO: consider a safer way.
  .orderBy('createdAt', 'desc').limit(5) 
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
// move chat to top if it is modified/added?
export const listenForChatUpdates = (userId, callback) => {
  console.log(`creating listener for all chats`);
  // db.collection(`chats`)
  db.collection(`users/${userId}/chats`)
  .orderBy('lastUpdated', 'desc')//.limit(5)
  .onSnapshot(snapshot => {
    snapshot.docChanges.forEach(change => {
      if (change.type === 'added' || change.type == 'modified') {
        const chatId = change.doc.id;
        const changeType = change.type;
        callback(chatId, changeType);
      }
    })
  });
}

const addChatToUser = async (userId, chatId) => {
  // we don't use the chat's actual lastUpdated
  // NOW is accurate if user has just joined
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  await db.collection(`users/${userId}/chats`).doc(`${chatId}`)
  .set({
    lastUpdated: timestamp,
    read: false
  });
  console.log(`db: chat ${chatId} to user ${userId}`);
};
const addUserToChat = async (chatId, userId) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  await db.collection(`chats/${chatId}/users`).doc(`${userId}`)
  .set({
    joinedAt: timestamp, // not sure if this is needed
    // lastMessageRead: undefined // cannot set to undefined
  })
  console.log(`db: added user ${userId} to chat ${chatId}`);
};

// TODO: should all asyncs return SOMETHING?
export const addChatParticipant = async (chatId, userId) => {
  console.log('chatId: ', chatId);
  console.log('userId: ', userId);
  await Promise.all([
    addChatToUser(userId, chatId),
    addUserToChat(chatId, userId)
  ]);
};
// creates a chat on db, and returns the chatId and data
export const createChat = async () => {
  try {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const chatRef = await db.collection('chats')
      .add({
        createdAt: timestamp,
        lastUpdated: timestamp
      });
    const chatSnapshot = await chatRef.get();
    console.log(`db: created new chat ${chatRef.id}`);
    return {
      chatId: chatRef.id,
      chatData: chatSnapshot.data()
    };
  } catch (e) {
    console.log(e);
  }
};
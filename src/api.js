import firebase from './firebase';

const db = firebase.firestore();
console.log('db api loaded');


// rethink try/catch block structure
export const createMessage = async (chatId, userId, text) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await db.collection(`chats/${chatId}/messages`)
    .add({
      author: userId,
      createdAt: timestamp,
      text
    });
    console.log(`db: user ${userId} added message "${text}" to chat ${chatId}`);
    // return db.collection(`chats/${chatId}/messages`)
  } catch (e) {
    console.log(e);
  }
};

export const listenToNewChatMessages = (chatId, callback) => {
  console.log(`creating listener for chat ${chatId}`);
  db.collection(`chats/${chatId}/messages`)
  .orderBy('createdAt', 'desc').limit(25)
  .onSnapshot(snapshot => {
    console.log(`changes in chat ${chatId} detected.`);
    // reversed so that earlier changes are processed first
    snapshot.docChanges.reverse().forEach(change => {
      // console.log(change.type);
      if (change.type === 'added') {
        const id = change.doc.id;
        const newMessage = change.doc.data();
        const isPending = change.doc.metadata.hasPendingWrites;
        callback(id, newMessage, isPending);
      }
    })
  });
};


// not used for now
// export const fetchMessages = async (chatId, limit) => {
//   try {
//     const snapshot = await db.collection(`chats/${chatId}/messages`)
//     .orderBy('createdAt', 'desc').limit(limit)
//     .get();
//     // return snapshot.docs.map(doc => doc.data());
//     return snapshot.docs.map(doc => doc.id);
//   }
//   catch (e) {
//     console.log(e);
//   }
// };

// export const createUser = async (name) => {
//   const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//   await db.collection('users')
//   .add({
//     name,
//     createdAt: timestamp
//   });
//   console.log(`db: created new user ${name}`);
// };

// export const createChat = async () => {
//   const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//   await db.collection('chats')
//   .add({
//     createdAt: timestamp
//   });
//   console.log(`db: created new chat`);
// };

// export const addChatToUser = async (userId, chatId) => {
//   await db.collection(`users/${userId}/chats`).doc(`${chatId}`)
//   .set({})
//   console.log(`db: chat ${chatId} to user ${userId}`);
// };

// export const addUserToChat = async (chatId, userId) => {
//   await db.collection(`chats/${chatId}/users`).doc(`${userId}`)
//   .set({})
//   console.log(`db: added user ${userId} to chat ${chatId}`);
// };
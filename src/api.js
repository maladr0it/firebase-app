import firebase from './firebase';

const db = firebase.firestore();
console.log('db api loaded');


// rethink try/catch block structure
export const createMessage = async (chatId, userId, text) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  try {
    const messageRef = await db.collection(`chats/${chatId}/messages`)
      .add({
        author: userId,
        createdAt: timestamp,
        text
      })
    console.log(`db: user ${userId} added message "${text}" to chat ${chatId}`);

    const createdMessage = await messageRef.get()
    // this won't have createdAt property. careful
    return {
      id: messageRef.id,
      message: createdMessage.data()
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

export const listenForNewChats = (callback) => {
  console.log(`creating listener for all chats`);
  db.collection(`chats`)
  .onSnapshot(snapshot => {
    // console.log('//////  chat change detected');
    // snapshot.docs.forEach(doc => console.log(doc.data()))
    snapshot.docChanges.forEach(change => {
      if (change.type == 'added') {
        console.log('/// this chat was added!');
        const chatId = change.doc.id;
        callback(chatId);
      }
    })
  });
}

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
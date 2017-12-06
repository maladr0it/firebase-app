import firebase from './firebase';

const db = firebase.firestore();
console.log('db api loaded');

export const createUser = async (name) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  await db.collection('users')
  .add({
    name,
    createdAt: timestamp
  });
  console.log(`db: created new user ${name}`);
};

export const createChat = async () => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  await db.collection('chats')
  .add({
    createdAt: timestamp
  });
  console.log(`db: created new chat`);
};

export const addChatToUser = async (userId, chatId) => {
  await db.collection(`users/${userId}/chats`).doc(`${chatId}`)
  .set({})
  console.log(`db: chat ${chatId} to user ${userId}`);
};

export const addUserToChat = async (chatId, userId) => {
  await db.collection(`chats/${chatId}/users`).doc(`${userId}`)
  .set({})
  console.log(`db: added user ${userId} to chat ${chatId}`);
};

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
  }
  catch (e) {
    console.log(e);
  }
};

export const fetchMessages = async (chatId, limit) => {
  try {
    return await db.collection(`chats/${chatId}/messages`)
    .orderBy('createdAt').limit(limit)
    .get();
  }
  catch (e) {
    console.log(e);
  }
};
import firebase from './firebase';

console.log('loading db api');
const db = firebase.firestore();

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
  await this.db.collection('chats')
  .add({
    createdAt: timestamp
  });
  console.log(`db: created new chat`);
};

export const addChatToUser = async (userId, chatId) => {
  await this.db.collection(`users/${userId}/chats`).doc(`${chatId}`)
  .set({})
  console.log(`db: chat ${chatId} to user ${userId}`);
};

export const addUserToChat = async (chatId, userId) => {
  await this.db.collection(`chats/${chatId}/users`).doc(`${userId}`)
  .set({})
  console.log(`db: added user ${userId} to chat ${chatId}`);
};

export const createMessage = async (chatId, userId, text) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  await this.db.collection(`chats/${chatId}/messages`)
  .add({
    author: userId,
    createdAt: timestamp,
    text
  });
  console.log(`db: user ${userId} added message "${text}" to chat ${chatId}`);
};
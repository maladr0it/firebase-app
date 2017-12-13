import * as db from '../api';


export const messageAdded = (chatId, messageId, messageData, isPending) => ({
  type: 'MESSAGE_ADDED',
  payload: { chatId, messageId, messageData, isPending }
});
export const messageSent = (messageId, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { messageId, messageData }
});
export const chatSelected = chatId => ({
  type: 'CHAT_SELECTED',
  payload: { chatId }
});
export const chatAdded = (chatId, chatData) => ({
  type: 'CHAT_ADDED',
  payload: { chatId, chatData }
});
export const chatUpdated = (chatId, chatData) => ({
  type: 'CHAT_UPDATED',
  payload: { chatId, chatData }
});
export const userAddedToChat = (chatId, userId) => ({
  type: 'USER_ADDED_TO_CHAT',
  payload: { chatId, userId }
});
export const loggedIn = userId => ({
  type: 'LOGGED_IN',
  payload: { userId }
});

// THUNKS HERE
// these should ONLY be used for DB related operations
// sending and listening
export const listenForChatUpdates = userId => dispatch => {
  // get most recently updated chats
  // -> probably should add data (meta) later

  // HERE: pass the data into add/modify func.

  db.listenForUserChatUpdates(userId, (chatId, chatData, changeType) => {
    if (changeType === 'added') {
      dispatch(chatAdded(chatId, chatData));

      // ideally wrap these 2 into 1
      dispatch(listenToChatForNewUsers(chatId));
      dispatch(listenToChatForNewMessages(chatId));
      // TODO: put listener somewhere else, perhaps in componentWillMount
      // this fires when the timestamp is updated
    } else if (changeType === 'modified') {
      dispatch(chatUpdated(chatId, chatData));
    }
  });
};
// ideally the callback here is fired again
// for when the message is actually added
// but can't figure out how to do so
export const listenToChatForNewMessages = chatId => dispatch => {
  db.listenToChatForNewMessages(chatId, (messageId, messageData, isPending) => {
    dispatch(messageAdded(chatId, messageId, messageData, isPending));
  });
};
export const listenToChatForNewUsers = chatId => dispatch => {
  db.listenToChatForNewUsers(chatId, userId => {
    dispatch(userAddedToChat(chatId, userId));
  });
};
// start listening for chat updates
export const login = userId => dispatch => {
  dispatch(listenForChatUpdates(userId));
  dispatch(loggedIn(userId));
};

export const sendMessage = (chatId, userId, text) => async dispatch => {
  try {
    const { messageId, messageData } = await db.sendMessage(chatId, userId, text);
    dispatch(messageSent(messageId, messageData));
  } catch (e) {
    console.log(e);
    // TODO: add proper error handling
    // dispatch(messageSendFailure(e));
  }
};
// create chat and add yourself as a participant, for now
// this likely won't be used in future
export const createChat = userId => async dispatch => {
  try {
    const { chatId } = await db.createChat();
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
// sets unread messages to 0, updates your lastReadMessage,
// sets user/:userId/selectedChatId
export const selectChat = (userId, chatId) => async dispatch => {
  dispatch(chatSelected(chatId));
  await db.setSelectedChatForUser(userId, chatId);
  await db.markUserChatAsRead(userId, chatId);
};



export const addChatParticipant = (chatId, userId) => async dispatch => {
  try {
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
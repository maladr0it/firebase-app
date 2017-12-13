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
export const chatAdded = chatId => ({
  type: 'CHAT_ADDED',
  payload: { chatId }
});
export const chatUpdated = chatId => ({
  type: 'CHAT_UPDATED',
  payload: { chatId }
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
  db.listenForUserChatUpdates(userId, (chatId, changeType) => {
    if (changeType === 'added') {
      dispatch(chatAdded(chatId));

      // ideally wrap these 2 into 1
      dispatch(listenToChatForNewUsers(chatId));
      dispatch(listenToChatForNewMessages(chatId));
      // TODO: put listener somewhere else, perhaps in componentWillMount
      // this fires when the timestamp is updated
    } else if (changeType === 'modified') {
      dispatch(chatUpdated(chatId));
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

// start listening for chat updates
export const login = userId => async dispatch => {
  dispatch(listenForChatUpdates(userId));
  dispatch(loggedIn(userId));
};

export const addChatParticipant = (chatId, userId) => async dispatch => {
  try {
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
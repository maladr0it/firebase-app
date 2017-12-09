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


// THUNKS HERE
// these should ONLY be used for DB related operations
// sending and listening


export const listenForChatUpdates = userId => dispatch => {
  // get most recently updated chats
  // probably should add data (meta) later
  db.listenForChatUpdates(userId, (chatId, changeType) => {
    if (changeType === 'added') {
      dispatch(chatAdded(chatId));
      dispatch(listenToChatForNewMessages(chatId));
      // TODO: put listener somewhere else, perhaps in componentWillMount
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
export const sendMessage = (chatId, userId, text) => async dispatch => {
  try {
    const { messageId, messageData } = await db.createMessage(chatId, userId, text);
    dispatch(messageSent(messageId, messageData));
  } catch (e) {
    console.log(e);
    // TODO: add proper error handling
    // dispatch(messageSendFailure(e));
  }
};

// create chat and add yourself as a participant, for now
export const createChat = (userId) => async dispatch => {
  try {
    const { chatId, chatData } = await db.createChat();
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
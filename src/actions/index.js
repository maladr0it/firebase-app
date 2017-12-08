import * as db from '../api';


export const messageAdded = (chatId, messageId, messageData, isPending) => ({
  type: 'MESSAGE_ADDED',
  payload: { chatId, messageId, messageData, isPending }
});
export const messageSent = (id, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { id, messageData }
});
export const chatSelected = chatId => ({
  type: 'CHAT_SELECTED',
  payload: { chatId }
});

export const chatAdded = (chatId, chatData) => ({
  type: 'CHAT_ADDED',
  payload: { chatId }
});


// THUNKS HERE
// these should ONLY be used for DB related operations
// sending and listening

export const listenForChats = () => dispatch => {
  // get most recently updated chats
  // probably should add data (meta) later
  db.listenForNewChats(chatId => {
    // a bit gross to dispatch 2 actions?
    dispatch(chatAdded(chatId));
    dispatch(listenToChat(chatId));
  });
};


// ideally the callback here is fired again
// for when the message is actually added
// but can't figure out how to do so
export const listenToChat = chatId => dispatch => {
  db.listenToChatForNewMessages(chatId, (messageId, messageData, isPending) => {
    dispatch(messageAdded(chatId, messageId, messageData, isPending));
  });
};
export const sendMessage = (chatId, userId, text) => async dispatch => {
  try {
    const { id, message } = await db.createMessage(chatId, userId, text);
    dispatch(messageSent(id, message));
  }
  catch (e) {
    console.log(e);
    // TODO: add proper error handling
    // dispatch(messageSendFailure(e));
  }
};
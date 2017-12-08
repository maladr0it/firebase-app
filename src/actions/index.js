import * as db from '../api';


export const messageAdded = (chatId, messageId, messageData, isPending) => ({
  type: 'MESSAGE_ADDED',
  payload: { chatId, messageId, messageData, isPending }
});
export const messageSent = (id, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { id, messageData }
});
export const chatSelected = (chatId) => ({
  type: 'CHAT_SELECTED',
  payload: { chatId }
});

// make this 
export const chatAdded = (chatId, chatData) => {

}



// THUNKS HERE
// these should ONLY be used for DB related operations
// sending and listening

export const listenToChats = () => dispatch => {
  // LATER
  // get most recently updated chats
};

// ideally the callback here is fired again
// for when the message is actually added
// but can't figure out how to do so
export const listenToMessages = chatId => dispatch => {
  db.listenToNewChatMessages(chatId, (messageId, messageData, isPending) => {
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
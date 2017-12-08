import * as db from '../api';

export const messageAdded = (id, messageData, isPending) => ({
  type: 'MESSAGE_ADDED',
  payload: { id, messageData, isPending }
});
export const messageSent = (id, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { id, messageData }
});

// get most recently updated chats
export const listenToChats = () => dispatch => {

};

export const listenToMessages = chatId => dispatch => {
  db.listenToNewChatMessages(chatId, (id, messageData, isPending) => {
    // ideally this is fired again
    // for when the message is actually added
    // but can't figure out how to do so
    dispatch(messageAdded(id, messageData, isPending));
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
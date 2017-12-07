import * as db from '../api';

export const addMessage = (id, message, isPending) => ({
  type: 'ADD_MESSAGE',
  payload: { id, message, isPending }
});
// add to chats, but make it grey
export const messageSendRequest = text => ({
  type: 'MESSAGE_SEND_REQUEST',
  payload: { text }
});
// flip colour of message to normal
export const messageSendSuccess = messageId => ({
  type: 'MESSAGE_SEND_SUCCESS',
  payload: { messageId }
});
// flip colour of message to red
export const messageSendFailure = error => ({
  type: 'MESSAGE_SEND_FAILURE',
  payload: { error }
});

export const listenToMessages = chatId => dispatch => {
  db.listenToNewChatMessages(chatId, (id, newMessage, isPending) => {
    // only add messages that are recognised by the server
    // ignore pending messages.
    // they will be added from the sendMessage action,
    // flagged as pending
    dispatch(addMessage(id, newMessage, isPending));
  });
};

export const sendMessage = (chatId, userId, text) => async dispatch => {
  // dispatch(messageSendRequest(text));
  // adds a ghost message to screen
  try {
    await db.createMessage(chatId, userId, text);
    // WE NEED MESSAGE ID TO BE RETURNED FROM CREATEMESSAGE!

    // HERE
    // dispatch(messageSendSuccess(messageId));
    // flips message to not-pending
  }
  catch (e) {
    dispatch(messageSendFailure(e));
  }
};

// export const fetchMessages = (chatId) => async dispatch => {
//   try {
//     const fetchedMessages = await db.fetchMessages(chatId, 100);
//     const messages = fetchedMessages.map(message => ({
//       text: message.text
//     }));
//     dispatch(addMessages(messages));
//   }
//   catch (e) {
//     console.log(e);
//   }
// };
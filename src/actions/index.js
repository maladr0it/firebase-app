import * as db from '../api';

export const messageAdded = (id, message, isPending) => ({
  type: 'MESSAGE_ADDED',
  payload: { id, message, isPending }
});
export const messageSendSucceeded = (id, sentMessage) => ({
  type: 'MESSAGE_SEND_SUCCEEDED',
  payload: { id, sentMessage }
});
// flip colour of message to red
// export const messageSendFailure = error => ({
//   type: 'MESSAGE_SEND_FAILED',
//   payload: { error }
// });

export const listenToMessages = chatId => dispatch => {
  db.listenToNewChatMessages(chatId, (id, newMessage, isPending) => {
    // ideally this is fired again
    // for when the message is actually added
    // but can't figure out how to do so
    dispatch(messageAdded(id, newMessage, isPending));
  });
};

export const sendMessage = (chatId, userId, text) => async dispatch => {
  try {
    const { id, message } = await db.createMessage(chatId, userId, text);
    dispatch(messageSendSucceeded(id, message));
  }
  catch (e) {
    console.log(e);
    // TODO: add proper error handling
    // dispatch(messageSendFailure(e));
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
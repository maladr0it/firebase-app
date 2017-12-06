import * as db from '../api';

export const messageSendRequest = text => ({
  type: 'MESSAGE_SEND_REQUEST',
  payload: { text } // this isn't used rn, but can be for message preview
});

// export const messageSendSuccess = () => ({
//   type: 'MESSAGE_SEND_SUCCESS'
// });

export const messageSendFailure = error => ({
  type: 'MESSAGE_SEND_FAILURE',
  payload: { error }
});

export const addMessage = message => ({
  type: 'ADD_MESSAGE',
  payload: { message }
});

export const addMessages = messages => ({
  type: 'ADD_MESSAGES',
  payload: { messages }
})

export const sendMessage = (chatId, userId, text) => async dispatch => {
  dispatch(messageSendRequest(text));
  try {
    await db.createMessage(chatId, userId, text);
    dispatch(addMessage({ text }));
  }
  catch (e) {
    dispatch(messageSendFailure(e));
  }
};

export const fetchMessages = (chatId) => async dispatch => {
  try {
    const snapshot = await db.fetchMessages(chatId, 100);
    const messages = snapshot.docs.map(doc => doc.data());
    dispatch(addMessages(messages));
  }
  catch (e) {
    console.log(e);
  }
};
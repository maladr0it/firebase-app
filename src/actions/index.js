import * as db from '../api';

export const addMessage = message => ({
  type: 'ADD_MESSAGE',
  payload: { message }
});
// used for adding multiple messages
// helps rendering performance, perhaps overkill
export const addMessages = messages => ({
  type: 'ADD_MESSAGES',
  payload: { messages }
});

// add to chats, but make it grey
export const messageSendRequest = text => ({
  type: 'MESSAGE_SEND_REQUEST',
  payload: { text }
});
// flip colour of message to normal
export const messageSendSuccess = () => ({
  type: 'MESSAGE_SEND_SUCCESS'
});
// flip colour of message to red
export const messageSendFailure = error => ({
  type: 'MESSAGE_SEND_FAILURE',
  payload: { error }
});

export const listenToMessages = (chatId) => dispatch => {
  db.listenToNewChatMessages(chatId, newMessage => {
    console.log(newMessage);
    dispatch(addMessage(newMessage));
  });
};

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
    const fetchedMessages = await db.fetchMessages(chatId, 100);
    const messages = fetchedMessages.map(message => ({
      text: message.text
    }));
    dispatch(addMessages(messages));
  }
  catch (e) {
    console.log(e);
  }
};
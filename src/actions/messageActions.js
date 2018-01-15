import * as db from '../api';

export const messageAdded = (chatId, messageId, messageData) => ({
  type: 'MESSAGE_ADDED',
  payload: {
    chatId, messageId, messageData,
  },
});
export const messageSent = (messageId, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { messageId, messageData },
});
export const messageUpdated = (messageId, messageData) => ({
  type: 'MESSAGE_UPDATED',
  payload: { messageId, messageData },
});
// THUNKS
export const sendMessage = (chatId, userId, text) => async (dispatch) => {
  try {
    const { messageId, messageData } = await db.sendMessage(chatId, userId, text);
    dispatch(messageSent(messageId, messageData));
  } catch (e) {
    console.log(e);
  }
};
export const startTyping = (userId, chatId) => () => {
  db.setUserTypingStatus(userId, chatId, true);
};
export const stopTyping = (userId, chatId) => () => {
  db.setUserTypingStatus(userId, chatId, false);
};
// LISTENERS
export const listenToChatForMessages = chatId => (dispatch) => {
  const callback = (messageId, messageData, changeType) => {
    if (changeType === 'added') {
      dispatch(messageAdded(chatId, messageId, messageData));
    } else if (changeType === 'modified') {
      dispatch(messageUpdated(messageId, messageData));
    }
  };
  const unsubscribe = db.listenToChatForMessages(chatId, callback);
  return unsubscribe;
};

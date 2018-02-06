import * as db from '../api';

export const messagesAdded = (chatId, messageIds, newMessages) => ({
  type: 'MESSAGES_ADDED',
  payload: { chatId, messageIds, newMessages },
});
export const messagesUpdated = (chatId, messageIds, updatedMessages) => ({
  type: 'MESSAGES_UPDATED',
  payload: { chatId, messageIds, updatedMessages },
});
export const messageSent = (messageId, messageData) => ({
  type: 'MESSAGE_SENT',
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
  const callback = (changes, messageIds) => {
    const newMessages = changes.filter(change => (change.type === 'added'));
    const updatedMessages = changes.filter(change => (change.type === 'modified'));

    if (newMessages.length > 0) {
      dispatch(messagesAdded(chatId, messageIds, newMessages));
    }
    if (updatedMessages.length > 0) {
      dispatch(messagesUpdated(chatId, messageIds, updatedMessages));
    }
  };
  const unsubscribe = db.listenToChatForMessages(chatId, callback);
  return unsubscribe;
};

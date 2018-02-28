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

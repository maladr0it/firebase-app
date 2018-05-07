import * as db from '../api';

const messageSent = (messageId, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { messageId, messageData },
});
// exported for listener callback
export const messagesAdded = (chatId, messageIds, newMessages) => ({
  type: 'MESSAGES_ADDED',
  payload: { chatId, messageIds, newMessages },
});

// THUNKS
export const sendMessage = (chatId, userId, text) => async (dispatch) => {
  const { messageId, messageData } = await db.sendMessage(chatId, userId, text);
  dispatch(messageSent(messageId, messageData));
};
export const startTyping = (userId, chatId) => () => {
  db.setUserTypingStatus(userId, chatId, true);
};
export const stopTyping = (userId, chatId) => () => {
  db.setUserTypingStatus(userId, chatId, false);
};

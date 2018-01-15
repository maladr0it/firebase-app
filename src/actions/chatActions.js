import * as db from '../api';

export const userAddedToChat = (chatId, userId, userData) => ({
  type: 'USER_ADDED_TO_CHAT',
  payload: { chatId, userId, userData },
});
export const chatUserUpdated = (chatId, userId, userData) => ({
  type: 'CHAT_USER_UPDATED',
  payload: { chatId, userId, userData },
});
export const scrollPosUpdated = (chatId, scrollPos, atBottom) => ({
  type: 'SCROLL_POS_UPDATED',
  payload: { chatId, scrollPos, atBottom },
});
export const draftTextUpdated = (chatId, text) => ({
  type: 'DRAFT_TEXT_UPDATED',
  payload: { chatId, text },
});
// THUNKS
export const listenToChatForUsers = chatId => (dispatch) => {
  const callback = (userId, userData, changeType) => {
    if (changeType === 'added') {
      dispatch(userAddedToChat(chatId, userId, userData));
    } else if (changeType === 'modified') {
      dispatch(chatUserUpdated(chatId, userId, userData));
    }
  };
  const unsubscribe = db.listenToChatForUsers(chatId, callback);
  return unsubscribe;
};

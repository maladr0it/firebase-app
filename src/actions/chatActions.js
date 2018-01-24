import * as db from '../api';

const chatUsersAdded = (chatId, newUsers, ids) => ({
  type: 'CHAT_USERS_ADDED',
  payload: { chatId, newUsers, ids },
});
const chatUsersUpdated = (chatId, updatedUsers) => ({
  type: 'CHAT_USERS_UPDATED',
  payload: { chatId, updatedUsers },
});
const chatUsersRemoved = (chatId, removedUsers, ids) => ({
  type: 'CHAT_USERS_REMOVED',
  payload: { chatId, removedUsers, ids },
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
export const removeUserFromChat = (chatId, userId) => () => {
  db.removeChatParticipant(chatId, userId);
};
export const addUserToChat = (chatId, userId) => () => {
  db.addChatParticipant(chatId, userId);
};
export const tagChat = (chatId, tagName) => () => {
  db.tagChat(chatId, tagName);
};
export const listenToChatForUsers = chatId => (dispatch) => {
  const callback = (changes, ids) => {
    const newUsers = changes.filter(change => (change.type === 'added'));
    if (newUsers.length > 0) {
      dispatch(chatUsersAdded(chatId, newUsers, ids));
    }
    const updatedUsers = changes.filter(change => (change.type === 'modified'));
    if (updatedUsers.length > 0) {
      dispatch(chatUsersUpdated(chatId, updatedUsers));
    }
    const removedUsers = changes.filter(change => (change.type === 'removed'));
    if (removedUsers.length > 0) {
      dispatch(chatUsersRemoved(chatId, removedUsers, ids));
    }
  };
  const unsubscribe = db.listenToChatForUsers(chatId, callback);
  return unsubscribe;
};

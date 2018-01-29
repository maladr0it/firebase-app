import * as db from '../api';

export const chatSelected = chatId => ({
  type: 'CHAT_SELECTED',
  payload: { chatId },
});
export const chatsAdded = (newChats, ids, feedName) => ({
  type: 'CHATS_ADDED',
  payload: { newChats, ids, feedName },
});
export const chatsUpdated = (updatedChats, ids, feedName) => ({
  type: 'CHATS_UPDATED',
  payload: { updatedChats, ids, feedName },
});
export const chatsRemoved = (ids, feedName) => ({
  type: 'CHATS_REMOVED',
  payload: { ids, feedName },
});
export const filterApplied = filter => ({
  type: 'FILTER_APPLIED',
  payload: { filter },
});
// THUNKS
// sets unread messages to 0, updates your lastReadMessage,
// sets user/:userId/selectedChatId
export const selectInboxChat = (userId, chatId) => (dispatch) => {
  dispatch(chatSelected(chatId));
  db.markMessagesAsRead(chatId, userId);
  db.setSelectedChatForUser(userId, chatId);
};
export const selectChat = (userId, chatId) => (dispatch) => {
  dispatch(chatSelected(chatId));
  db.setSelectedChatForUser(userId, chatId);
};
// create chat and add yourself as a participant, for now
// this likely won't be used in future
export const createChat = userId => async () => {
  try {
    const { chatId } = await db.createChat();
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};
export const listenToUserChats = (userId, feedName) => (dispatch) => {
  const callback = (changes, ids) => {
    const newChats = changes.filter(change => (change.type === 'added'));
    const updatedChats = changes.filter(change => (change.type === 'modified'));
    const removedChats = changes.filter(change => (change.type === 'removed'));

    if (newChats.length > 0) {
      dispatch(chatsAdded(newChats, ids, feedName));
    }
    if (updatedChats.length > 0) {
      dispatch(chatsUpdated(updatedChats, ids, feedName));
    }
    if (removedChats.length > 0) {
      dispatch(chatsRemoved(ids, feedName));
    }
  };
  const unsubscribe = db.listenToUserChats(userId, callback);
  return unsubscribe;
};
  // testing
export const listenToFilteredChats = (tagName, feedName) => (dispatch) => {
  const callback = (changes, ids) => {
    const newChats = changes.filter(change => (change.type === 'added'));
    const updatedChats = changes.filter(change => (change.type === 'modified'));
    const removedChats = changes.filter(change => (change.type === 'removed'));

    if (newChats.length > 0) {
      dispatch(chatsAdded(newChats, ids, feedName));
    }
    if (updatedChats.length > 0) {
      dispatch(chatsUpdated(updatedChats, ids, feedName));
    }
    if (removedChats.length > 0) {
      dispatch(chatsRemoved(ids, feedName));
    }
  };
  const unsubscribe = db.listenToFilteredChats(tagName, callback);
  return unsubscribe;
};

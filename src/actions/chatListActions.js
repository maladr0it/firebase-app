import * as db from '../api';

export const chatSelected = chatId => ({
  type: 'CHAT_SELECTED',
  payload: { chatId },
});
export const chatsAdded = (newChats, ids) => ({
  type: 'CHATS_ADDED',
  payload: { newChats, ids },
});
export const chatsUpdated = (updatedChats, ids) => ({
  type: 'CHATS_UPDATED',
  payload: { updatedChats, ids },
});
export const chatsRemoved = ids => ({
  type: 'CHATS_REMOVED',
  payload: { ids },
});
// THUNKS
// sets unread messages to 0, updates your lastReadMessage,
// sets user/:userId/selectedChatId
export const selectChat = (userId, chatId) => async (dispatch) => {
  dispatch(chatSelected(chatId));
  db.markMessagesAsRead(chatId, userId);
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
export const listenForChatUpdates = userId => (dispatch) => {
  const callback = (changes, ids) => {
    const newChats = changes.filter(change => (change.type === 'added'));
    const updatedChats = changes.filter(change => (change.type === 'modified'));
    const removedChats = changes.filter(change => (change.type === 'removed'));

    if (newChats.length > 0) {
      dispatch(chatsAdded(newChats, ids));
    }
    if (updatedChats.length > 0) {
      dispatch(chatsUpdated(updatedChats, ids));
    }
    if (removedChats.length > 0) {
      dispatch(chatsRemoved(ids));
    }
  };
  const unsubscribe = db.listenForUserChatUpdates(userId, callback);
  return unsubscribe;
};
  // testing
export const listenForTaggedChats = tagName => (dispatch) => {
  const callback = (changes, ids) => {
    const newChats = changes.filter(change => (change.type === 'added'));
    const updatedChats = changes.filter(change => (change.type === 'modified'));
    const removedChats = changes.filter(change => (change.type === 'removed'));

    if (newChats.length > 0) {
      dispatch(chatsAdded(newChats, ids));
    }
    if (updatedChats.length > 0) {
      dispatch(chatsUpdated(updatedChats, ids));
    }
    if (removedChats.length > 0) {
      dispatch(chatsRemoved(ids));
    }
  };
  const unsubscribe = db.listenForTaggedChats(tagName, callback);
  return unsubscribe;
};

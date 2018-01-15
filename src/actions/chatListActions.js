import * as db from '../api';

export const chatSelected = chatId => ({
  type: 'CHAT_SELECTED',
  payload: { chatId },
});
export const chatAdded = (chatId, chatData) => ({
  type: 'CHAT_ADDED',
  payload: { chatId, chatData },
});
export const chatUpdated = (chatId, chatData) => ({
  type: 'CHAT_UPDATED',
  payload: { chatId, chatData },
});
export const chatsReordered = chatIds => ({
  type: 'CHATS_REORDERED',
  payload: { chatIds },
});
// THUNKS
// sets unread messages to 0, updates your lastReadMessage,
// sets user/:userId/selectedChatId
export const selectChat = (userId, chatId) => async (dispatch) => {
  dispatch(chatSelected(chatId));
  db.markMessagesAsRead(chatId, userId);
  db.setSelectedChatForUser(userId, chatId);
};
export const addChatParticipant = (chatId, userId) => async () => {
  try {
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
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
  const snapshotCb = (chatIds) => {
    dispatch(chatsReordered(chatIds));
  };
  const docChangeCb = (chatId, chatData, changeType) => {
    if (changeType === 'added') {
      dispatch(chatAdded(chatId, chatData));
    } else if (changeType === 'modified') {
      dispatch(chatUpdated(chatId, chatData));
    }
  };
  const unsubscribe = db.listenForUserChatUpdates(userId, snapshotCb, docChangeCb);
  return unsubscribe;
};

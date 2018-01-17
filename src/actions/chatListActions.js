import * as db from '../api';

export const chatSelected = chatId => ({
  type: 'CHAT_SELECTED',
  payload: { chatId },
});
export const chatsAdded = newChats => ({
  type: 'CHATS_ADDED',
  payload: { newChats },
});
export const chatUpdated = (chatId, chatData) => ({
  type: 'CHAT_UPDATED',
  payload: { chatId, chatData },
});
export const chatsUpdated = updatedChats => ({
  type: 'CHATS_UPDATED',
  payload: { updatedChats },
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
  const callback = (changes) => {
    const newChats = changes.filter(change => (change.type === 'added'));
    const updatedChats = changes.filter(change => (change.type === 'modified'));

    if (newChats.length > 0) {
      dispatch(chatsAdded(newChats));
    }
    if (updatedChats.length > 0) {
      dispatch(chatsUpdated(updatedChats));
    }
  };
  const unsubscribe = db.listenForUserChatUpdates(userId, callback);
  return unsubscribe;
};

  // const snapshotCb = (chatIds) => {
  //   dispatch(chatsReordered(chatIds));
  // };
  // const docChangeCb = (chatId, chatData, changeType) => {
  //   if (changeType === 'added') {
  //     dispatch(chatAdded(chatId, chatData));
  //   } else if (changeType === 'modified') {
  //     dispatch(chatUpdated(chatId, chatData));
  //   }
  // };


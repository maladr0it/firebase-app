import * as db from '../api';

export const messageAdded = (chatId, messageId, messageData, isPending) => ({
  type: 'MESSAGE_ADDED',
  payload: {
    chatId, messageId, messageData, isPending,
  },
});
export const messageSent = (messageId, messageData) => ({
  type: 'MESSAGE_SENT',
  payload: { messageId, messageData },
});
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
export const userAddedToChat = (chatId, userId, userData) => ({
  type: 'USER_ADDED_TO_CHAT',
  payload: { chatId, userId, userData },
});
export const chatUserUpdated = (chatId, userId, userData) => ({
  type: 'CHAT_USER_UPDATED',
  payload: { chatId, userId, userData },
});
export const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
export const loggedOut = () => ({
  type: 'LOGGED_OUT',
});
export const chatsReordered = chatIds => ({
  type: 'CHATS_REORDERED',
  payload: { chatIds },
});
export const scrollPosUpdated = (chatId, scrollPos, atBottom) => ({
  type: 'SCROLL_POS_UPDATED',
  payload: { chatId, scrollPos, atBottom },
});
export const draftTextUpdated = (chatId, text) => ({
  type: 'DRAFT_TEXT_UPDATED',
  payload: { chatId, text },
});

// THUNKS HERE
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
export const listenToChatForMessages = chatId => (dispatch) => {
  const callback = (messageId, messageData, isPending) => {
    dispatch(messageAdded(chatId, messageId, messageData, isPending));
  };
  const unsubscribe = db.listenToChatForMessages(chatId, callback);
  return unsubscribe;
};
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
export const login = userId => async (dispatch) => {
  const userData = await db.getUser(userId);
  dispatch(loggedIn(userId, userData));
};
export const logout = () => (dispatch) => {
  dispatch(loggedOut());
};
export const sendMessage = (chatId, userId, text) => async (dispatch) => {
  try {
    const { messageId, messageData } = await db.sendMessage(chatId, userId, text);
    dispatch(messageSent(messageId, messageData));
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
// sets unread messages to 0, updates your lastReadMessage,
// sets user/:userId/selectedChatId
export const selectChat = (userId, chatId) => async (dispatch) => {
  dispatch(chatSelected(chatId));
  db.setSelectedChatForUser(userId, chatId);
};
export const startTyping = (userId, chatId) => () => {
  db.setUserTypingStatus(userId, chatId, true);
};
export const stopTyping = (userId, chatId) => () => {
  db.setUserTypingStatus(userId, chatId, false);
};

export const addChatParticipant = (chatId, userId) => async () => {
  try {
    await db.addChatParticipant(chatId, userId);
  } catch (e) {
    console.log(e);
  }
};

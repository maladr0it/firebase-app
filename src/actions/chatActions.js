import * as db from '../api';

export const scrollPosUpdated = (chatId, scrollPos, atBottom) => ({
  type: 'SCROLL_POS_UPDATED',
  payload: { chatId, scrollPos, atBottom },
});
export const draftTextUpdated = (chatId, text) => ({
  type: 'DRAFT_TEXT_UPDATED',
  payload: { chatId, text },
});
export const chatDataUpdated = (chatId, data) => ({
  type: 'CHAT_DATA_UPDATED',
  payload: { chatId, data },
});
// THUNKS
export const removeUserFromChat = (chatId, userId) => () => {
  db.removeChatParticipant(chatId, userId);
};
export const addUserToChat = (chatId, displayName) => async () => {
  const userId = await db.getUserIdByName(displayName);
  db.addChatParticipant(chatId, userId);
};
export const tagChat = (chatId, tagName) => () => {
  db.tagChat(chatId, tagName);
};
export const untagChat = (chatId, tagName) => () => {
  db.untagChat(chatId, tagName);
};

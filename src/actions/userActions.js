import * as db from '../api';

export const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
export const loggedOut = () => ({
  type: 'LOGGED_OUT',
});
export const chatUsersUpdated = (chatId, userIds) => ({
  type: 'CHAT_USERS_UPDATED',
  payload: { chatId, userIds },
});
export const userDataUpdated = (userId, userData) => ({
  type: 'USER_DATA_UPDATED',
  payload: { userId, userData },
});
// THUNKS
export const login = userId => async (dispatch) => {
  const userData = await db.getUser(userId);
  console.log(`welcome ${userData.username}`);
  dispatch(loggedIn(userId, userData));
};
export const logout = () => (dispatch) => {
  dispatch(loggedOut());
};
export const createUser = username => async () => {
  try {
    const userDoc = await db.createUser(username);
    console.log(`created user ${userDoc.id}`);
  } catch (e) {
    console.log(e);
  }
};
const listenToUser = userId => (dispatch) => {
  const callback = (data) => {
    dispatch(userDataUpdated(userId, data));
  };
  const unsubscribe = db.listenToUser(userId, callback);
  return unsubscribe;
};
export const listenToChatForUsers = chatId => (dispatch) => {
  const callback = (changes, userIds) => {
    const newUsers = changes.filter(change => (change.type === 'added'));
    // const updatedUsers = changes.filter(change => (change.type === 'modified'));
    // const removedUsers = changes.filter(change => (change.type === 'removed'));
    if (newUsers.length > 0) {
      newUsers.forEach(user => dispatch(listenToUser(user.id)));
      dispatch(chatUsersUpdated(chatId, userIds));
    }
  };
  const unsubscribe = db.listenToChatForUsers(chatId, callback);
  return unsubscribe;
};

import * as db from '../api';

export const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
export const loggedOut = () => ({
  type: 'LOGGED_OUT',
});
export const chatUsersUpdated = (chatId, userIds, changes) => ({
  type: 'CHAT_USERS_UPDATED',
  payload: { chatId, userIds, changes },
});
export const userDataUpdated = (userId, userData) => ({
  type: 'USER_DATA_UPDATED',
  payload: { userId, userData },
});
export const userListenerOpened = userId => ({
  type: 'LISTENER_OPENED',
  payload: { resourceType: 'users', resourceId: userId },
});
// THUNKS
export const login = username => async (dispatch) => {
  const user = await db.getUserByName(username);
  if (user) {
    console.log(`welcome ${user.data.username}`);
    dispatch(loggedIn(user.id, user.data));
  }
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
const listenToUser = userId => (dispatch, getState) => {
  let unsubscribe;
  // only open listener if it does not yet exist
  if (!getState().listeners.users[userId]) {
    const callback = (data) => {
      dispatch(userDataUpdated(userId, data));
    };
    dispatch(userListenerOpened(userId));
    unsubscribe = db.listenToUser(userId, callback);
  }
  return unsubscribe;
};
export const listenToChatForUsers = chatId => (dispatch) => {
  const callback = (changes, userIds) => {
    const newUsers = changes.filter(change => (change.type === 'added'));
    // open a listener to this user if they are new
    if (newUsers.length > 0) {
      newUsers.forEach(user => dispatch(listenToUser(user.id)));
    }
    dispatch(chatUsersUpdated(chatId, userIds, changes));
  };
  const unsubscribe = db.listenToChatForUsers(chatId, callback);
  return unsubscribe;
};

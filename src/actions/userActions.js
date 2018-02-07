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
    // open a listener to this user if they are new
    if (newUsers.length > 0) {
      newUsers.forEach(user => dispatch(listenToUser(user.id)));
    }
    // get 'isJoined' userIds only
    const joinedUsers = changes.filter(change => (
      change.data.isJoined === true
    ));
    const joinedUserIds = joinedUsers.map(user => user.id);
    console.log(joinedUsers);
    dispatch(chatUsersUpdated(chatId, joinedUserIds));
  };
  const unsubscribe = db.listenToChatForUsers(chatId, callback);
  return unsubscribe;
};

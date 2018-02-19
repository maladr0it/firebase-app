import * as db from '../api';

const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
const loggedOut = () => ({
  type: 'LOGGED_OUT',
});
const chatUsersUpdated = (chatId, userIds, changes) => ({
  type: 'CHAT_USERS_UPDATED',
  payload: { chatId, userIds, changes },
});
const userDataUpdated = (userId, userData) => ({
  type: 'USER_DATA_UPDATED',
  payload: { userId, userData },
});
const userListenerOpened = userId => ({
  type: 'LISTENER_OPENED',
  payload: { resourceType: 'users', resourceId: userId },
});
const reservationsUpdated = (userId, reservationIds, changes) => ({
  type: 'RESERVATIONS_UPDATED',
  payload: { userId, reservationIds, changes },
});
const avatarUrlSet = (userId, url) => ({
  type: 'AVATAR_URL_SET',
  payload: { userId, url },
});
export const userSelected = (chatId, userId) => ({
  type: 'USER_SELECTED',
  payload: { chatId, userId },
});
export const reservationSelected = (chatId, reservationId) => ({
  type: 'RESERVATION_SELECTED',
  payload: { chatId, reservationId },
});

// THUNKS
const getAvatar = (userId, data) => async (dispatch) => {
  const url = await db.getAvatar(data.avatarName);
  dispatch(avatarUrlSet(userId, url));
};
const listenToUser = userId => (dispatch, getState) => {
  // only open listener if it does not yet exist
  if (!getState().listeners.users[userId]) {
    const userCallback = (data) => {
      dispatch(userDataUpdated(userId, data));
      dispatch(getAvatar(userId, data)); // TODO updates avatar even if it hasn't changed
    };
    const reservationCallback = (changes, reservationIds) => {
      dispatch(reservationsUpdated(userId, reservationIds, changes));
    };
    dispatch(userListenerOpened(userId));
    db.listenToUser(userId, userCallback);
    db.listenForReservations(userId, reservationCallback);
  }
};
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
// TODO: some of these reservation functions don't belong here
export const createReservation = (userId, description) => () => {
  db.createReservation(userId, description);
};
export const updateReservation = (reservationId, data) => () => {
  db.updateReservation(reservationId, data);
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

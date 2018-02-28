import * as db from '../api';

import { listenToInbox } from './listenerActions';

const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
const loggedOut = () => ({
  type: 'LOGGED_OUT',
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
// TODO: these are exported temporarily for listenerActions to use
export const userDataUpdated = (userId, userData) => ({
  type: 'USER_DATA_UPDATED',
  payload: { userId, userData },
});
export const chatUsersUpdated = (chatId, userIds, changes) => ({
  type: 'CHAT_USERS_UPDATED',
  payload: { chatId, userIds, changes },
});

// THUNKS
const getAvatar = (userId, data) => async (dispatch) => {
  const url = await db.getAvatar(data.avatarName);
  dispatch(avatarUrlSet(userId, url));
};
// TODO: this is a bit gross, but should be the loose model
// for how inbox and chats are listened to, also
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
    db.listenForUserReservations(userId, reservationCallback);
  }
};
export const login = username => async (dispatch) => {
  const user = await db.getUserByName(username);
  if (user) {
    console.log(`welcome ${user.data.username}`);
    dispatch(loggedIn(user.id, user.data));
    // TODO: sloppy experimental
    dispatch(listenToInbox(user.id, 'inbox'));
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
export const updateReservation = (reservationId, data) => async () => (
  db.updateReservation(reservationId, data)
);
export const deleteReservation = reservationId => async () => (
  db.deleteReservation(reservationId)
);
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

// TODO: just for testing
const allReservationsUpdated = (changes, reservationIds) => ({
  type: 'RESERVATIONS_UPDATED',
  payload: { changes, reservationIds },
});

export const listenForAllReservations = () => (dispatch) => {
  const callback = (changes, reservationIds) => {
    dispatch(allReservationsUpdated(changes, reservationIds));
  };
  db.listenForAllReservations(callback);
};

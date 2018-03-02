import * as db from '../api';

import { listenToInbox, listenToFilteredChats } from './listenerActions';

const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
const loggedOut = () => ({
  type: 'LOGGED_OUT',
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
export const reservationsUpdated = (userId, reservationIds, changes) => ({
  type: 'RESERVATIONS_UPDATED',
  payload: { userId, reservationIds, changes },
});

// THUNKS
export const getAvatar = (userId, data) => async (dispatch) => {
  const url = await db.getAvatar(data.avatarName);
  dispatch(avatarUrlSet(userId, url));
};
export const login = username => async (dispatch) => {
  const user = await db.getUserByName(username);
  if (user) {
    console.log(`welcome ${user.data.username}`);
    dispatch(loggedIn(user.id, user.data));
    // TODO: sloppy experimental
    dispatch(listenToInbox(user.id, 'inbox'));
    dispatch(listenToFilteredChats('isOpen', 'isOpen'));
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

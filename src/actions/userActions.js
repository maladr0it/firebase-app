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
export const login = id => async (dispatch) => {
  const userData = await db.getUser(id);
  console.log(userData);
  dispatch(loggedIn(id, userData));
  dispatch(listenToInbox(id, 'inbox'));
  // dispatch(listenToFilteredChats('isOpen', 'isOpen'));
};
export const logout = () => (dispatch) => {
  dispatch(loggedOut());
};

export const createUser = userData => async () => {
  await db.createUser(userData);
};

export const loginWithGoogle = () => async (dispatch) => {
  const userData = await db.loginWithGoogle();
  if (!userData.isNewUser) {
    console.log(`logging in as ${userData.displayName}`);
    dispatch(login(userData.id));
  } else {
    dispatch(createUser(userData));
  }
};
// TODO: some of these reservation functions don't belong here
export const createReservation = (userId, description) => () => {
  db.createReservation(userId, description);
};
export const updateReservation = (reservationId, data) => async () =>
  db.updateReservation(reservationId, data);
export const deleteReservation = reservationId => async () => db.deleteReservation(reservationId);

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

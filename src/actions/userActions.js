import * as db from '../api';

export const loggedIn = (userId, userData) => ({
  type: 'LOGGED_IN',
  payload: { userId, userData },
});
export const loggedOut = () => ({
  type: 'LOGGED_OUT',
});
// THUNKS
export const login = userId => async (dispatch) => {
  const userData = await db.getUser(userId);
  dispatch(loggedIn(userId, userData));
};
export const logout = () => (dispatch) => {
  dispatch(loggedOut());
};

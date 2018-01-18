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

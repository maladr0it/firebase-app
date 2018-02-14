// example
// users = {
//   usr19194: { username: 'sam', avatarURL: 'http://...' },
//   usr19857: { username: 'bill', avatarURL: 'http://...' },
// };

const defaultState = {};
const defaultUser = {};

const users = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_DATA_UPDATED': {
      const { userId, userData } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], ...userData },
      };
    }
    case 'RESERVATIONS_UPDATED': {
      const { userId, reservationIds } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], reservationIds },
      };
    }
    case 'AVATAR_URL_SET': {
      const { userId, url } = action.payload;
      console.log(`setting user ${userId}'s avatar URL to: ${url}`);
      return {
        ...state,
        [userId]: { ...state[userId], avatarUrl: url },
      };
    }
    default:
      return state;
  }
};
export default users;

export const getUsers = (state, ids = []) => (
  ids.map((id) => {
    const userData = state[id] || defaultUser;
    return { id, ...userData };
  })
);
export const getUser = (state, userId) => (
  state[userId] || defaultUser
);
export const getReadUsers = (state, readStatus) => {
  const userIds = Object.keys(readStatus).filter(id => readStatus[id] != null);
  return getUsers(state, userIds);
};

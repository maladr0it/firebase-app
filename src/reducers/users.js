// example
// users = {
//   usr19194: { username: 'sam', avatarURL: 'http://...' },
//   usr19857: { username: 'bill', avatarURL: 'http://...' },
// };

const defaultState = {};
const defaultUser = { username: 'LOADING...' };

const users = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_DATA_UPDATED': {
      const { userId, userData } = action.payload;
      console.log('adding/updating user data');
      console.log(userData);
      return {
        ...state,
        [userId]: userData,
      };
    }
    default:
      return state;
  }
};
export default users;

export const getUsers = (state, userIds) => (
  userIds.map((id) => {
    const userData = state[id] || defaultUser;
    return { id, ...userData };
  })
);

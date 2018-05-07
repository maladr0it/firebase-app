const defaultState = {
  userId: undefined,
  displayName: undefined,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      const { userId, userData } = action.payload;
      return {
        ...state,
        userId,
        displayName: userData.displayName,
      };
    }
    case 'LOGGED_OUT': {
      return defaultState;
    }
    default:
      return state;
  }
};

export default user;

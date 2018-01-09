const defaultState = {
  userId: undefined,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      const { userId } = action.payload;
      return {
        ...state,
        userId,
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

const defaultState = {
  userId: undefined
  // userId: '1jjahsBIp6Z8DkXKCmZa', // name: samantha
  // userId: '3isyyZt5AZEWpXDVRokV',  // name: zami

  // userIds: ['3isyyZt5AZEWpXDVRokV', '1jjahsBIp6Z8DkXKCmZa']
  // zami, samantha
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      const { userId } = action.payload;
      return {
        ...state,
        userId
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        userId: undefined
      };
    }
    default:
      return state;
  }
};

export default user;
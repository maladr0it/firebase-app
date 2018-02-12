// example
// const listeners = {
//   users: {
//     'usr190841': true,
//     'usr191481': true,
//   },
//   chats: {
//     'cht817514': true,
//   },
//   chatUsers: {
//     'cht817514': true,
//   },
// };

const defaultState = {
  users: {},
  chats: {},
};

const listeners = (state = defaultState, action) => {
  switch (action.type) {
    case 'LISTENER_OPENED': {
      const { resourceType, resourceId } = action.payload;
      return {
        ...state,
        [resourceType]: {
          ...state[resourceType],
          [resourceId]: true,
        },
      };
    }
    default:
      return state;
  }
};
export default listeners;

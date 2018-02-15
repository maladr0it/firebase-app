// example
// chats = {
//   chat94109810: {
//     FROM DB
//     createdAt: 90840118,
//     lastUpdated: 1930581,
//     tags: { hasAgent: true, newCustomer: true, etc... }
//
//     LOCAL DB
//     messageIds: ['msg29401', 'msg49081', 'mgs02821']
//     userIds: ['usr0001', 'usr0002', 'usr0003'],
//     users: { usr0001: { isTyping: etc...}, usr0002: { isT..} }
//   },
// };

// TODO: might not need this if
// defaultProps and selectors are set up correctly
const defaultChat = {
  messageIds: [],
  userIds: [],
  usersState: {}, // chat-specific user data (joinedStatus, isTyping)
  tags: {},
};

const chat = (state = defaultChat, action) => {
  switch (action.type) {
    case 'CHAT_DATA_UPDATED': {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
      };
    }
    case 'CHAT_USERS_UPDATED': {
      const { userIds, changes } = action.payload;
      const usersData = changes.reduce((acc, userDoc) => {
        acc[userDoc.id] = userDoc.data;
        return acc;
      }, {});
      return {
        ...state,
        userIds,
        usersState: { ...state.usersState, ...usersData },
      };
    }
    case 'MESSAGES_ADDED': {
      const { messageIds } = action.payload;
      return {
        ...state,
        messageIds,
      };
    }
    default:
      return state;
  }
};

const defaultState = {};

const chats = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_DATA_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'CHAT_USERS_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'MESSAGES_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'LOGGED_OUT': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default chats;

// TODO: optimise this
// it is passing too much stuff
// consider thinning out the chat object

// defaultChat should not be needed
export const getChat = (state, chatId) => (
  state[chatId] || defaultChat
);
export const getUserIds = (state, chatId) => (
  getChat(state, chatId).userIds
);
export const getJoinedUserIds = (state, chatId) => {
  const { usersState } = getChat(state, chatId);
  return Object.keys(usersState).filter(id => (
    usersState[id].isJoined
  ));
};
export const getTags = (state, chatId) => (
  Object.keys(getChat(state, chatId).tags)
);

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
//
//     DISPLAY
//     scrollPos: 400,
//     atBottom: true,
//     draftText: '',
//   },
// };

// TODO: might not need this if
// defaultProps and selectors are set up correctly
const defaultChat = {
  messageIds: [],
  userIds: [],
  tags: {},
  scrollPos: 0,
  atBottom: true,
  draftText: '',
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
      const { userIds } = action.payload;
      return {
        ...state,
        userIds,
      };
    }
    case 'MESSAGES_ADDED': {
      const { messageIds } = action.payload;
      return {
        ...state,
        messageIds,
      };
    }
    case 'SCROLL_POS_UPDATED': {
      const { scrollPos, atBottom } = action.payload;
      return {
        ...state,
        scrollPos,
        atBottom,
      };
    }
    case 'DRAFT_TEXT_UPDATED': {
      const { text } = action.payload;
      return {
        ...state,
        draftText: text,
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
    case 'SCROLL_POS_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'DRAFT_TEXT_UPDATED': {
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
export const getChat = (state, chatId) => (
  state[chatId] || defaultChat
);
export const getUserIds = (state, chatId) => (
  getChat(state, chatId).userIds
);
export const getTags = (state, chatId) => (
  Object.keys(getChat(state, chatId).tags)
);

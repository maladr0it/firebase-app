// example
// chats = {
//   chat94109810: {
//     createdAt: 90840118,
//     lastUpdated: 1930581,
//     scrollPos: 400,
//     atBottom: true,
//     messageIds: ['msg29401', 'msg49081', 'mgs02821']
//     userIds: ['usr0001', 'usr0002', 'usr0003'],
//     users: { usr0001: { isTyping: etc...}, usr0002: { isT..} }
//     draftText: ''
//   },
// }

const defaultChat = {
  messageIds: [],
  userIds: [],
  users: {},
  scrollPos: 0,
  atBottom: true,
  draftText: '',
};

const chat = (state = defaultChat, action) => {
  switch (action.type) {
    case 'CHAT_ADDED': {
      const { chatData } = action.payload;
      return {
        ...state,
        ...chatData, // includes unreadCount, lastUpdated
      };
    }
    case 'CHAT_UPDATED': {
      const { chatData } = action.payload;
      return {
        ...state,
        ...chatData,
      };
    }
    case 'MESSAGE_ADDED': {
      const { messageId } = action.payload;
      return {
        ...state,
        messageIds: [...state.messageIds, messageId],
      };
    }
    case 'USER_ADDED_TO_CHAT': {
      const { userId, userData } = action.payload;
      return {
        ...state,
        userIds: [...state.userIds, userId],
        users: {
          ...state.users,
          [userId]: userData,
        },
      };
    }
    case 'USER_REMOVED_FROM_CHAT': {
      const { userId } = action.payload;
      console.log('removing', userId);
      return {
        ...state,
        userIds: state.userIds.filter(id => id !== userId),
      };
    }
    case 'CHAT_USER_UPDATED': {
      const { userId, userData } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [userId]: userData,
        },
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
    case 'CHAT_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'CHAT_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'MESSAGE_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'USER_ADDED_TO_CHAT': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'USER_REMOVED_FROM_CHAT': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action),
      };
    }
    case 'CHAT_USER_UPDATED': {
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

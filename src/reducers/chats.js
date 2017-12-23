// example
// chats = {
//   chat94109810: {
//     createdAt: 90840118,
//     lastUpdated: 1930581,
//     scrollPos:
//     messageIds: ['msg29401', 'msg49081', 'mgs02821']
//     userIds: ['usr0001', 'usr0002', 'usr0003']
//   },
// }

const defaultChat = { messageIds: [], userIds: [], scrollPos: 0 };

const chat = (state = defaultChat, action) => {
  switch(action.type) {
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
        ...chatData
      };
    }
    case 'MESSAGE_ADDED': {
      const { messageId } = action.payload;
      return {
        ...state,
        messageIds: [...state.messageIds, messageId]
      };
    }
    case 'USER_ADDED_TO_CHAT': {
      const { userId } = action.payload;
      return {
        ...state,
        userIds: [...state.userIds, userId]
      };
    }
    case 'SCROLL_POS_UPDATED': {
      const { scrollPos } = action.payload;
      return {
        ...state,
        scrollPos
      };
    }
    default:
      return state;
  }
};

const defaultState = {};

const chats = (state = defaultState, action) => {
  switch(action.type) {
    case 'CHAT_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action)
      };
    }
    case 'CHAT_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action)
      };
    }
    case 'MESSAGE_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action)
      };
    }
    case 'USER_ADDED_TO_CHAT': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId] : chat(state[chatId], action)
      };
    }
    case 'SCROLL_POS_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId] : chat(state[chatId], action)
      };
    }
    default:
      return state;
  }
};

export default chats;
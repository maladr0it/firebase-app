const defaultState = {
  chatIdsByFeed: {
    inbox: [],
    hasAgent: [],
  },
  filters: [],
  selectedChat: undefined,
};

const chatApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      // restore session as it was
      const { userData } = action.payload;
      return {
        ...state,
        selectedChat: userData.selectedChatId,
      };
    }
    // wipe list
    case 'LOGGED_OUT': {
      return defaultState;
    }
    case 'FILTER_ADDED': {
      const { filter } = action.payload;
      return {
        ...state,
        filters: [...state.filters, filter],
      };
    }
    case 'CHATS_ADDED': {
      const { ids, feedName } = action.payload;
      return {
        ...state,
        chatIdsByFeed: { ...state.chatIdsByFeed, [feedName]: ids },
      };
    }
    case 'CHATS_UPDATED': {
      const { ids, feedName } = action.payload;
      return {
        ...state,
        chatIdsByFeed: { ...state.chatIdsByFeed, [feedName]: ids },
      };
    }
    case 'CHATS_REMOVED': {
      const { ids, feedName } = action.payload;
      return {
        ...state,
        chatIdsByFeed: { ...state.chatIdsByFeed, [feedName]: ids },
      };
    }
    case 'CHAT_SELECTED': {
      const { chatId } = action.payload;
      return {
        ...state,
        selectedChat: chatId,
      };
    }
    default:
      return state;
  }
};
export default chatApp;

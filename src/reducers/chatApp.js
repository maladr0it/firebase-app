const defaultState = {
  chatIds: [],
  // experiment with this
  chatIdsByFeed: {
    inbox: [],
    hasAgent: [],
  },
  selectedChat: undefined,
};

// chat Ids are in reverse order, with oldest being at the end

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
    case 'CHATS_ADDED': {
      const { ids, feedName } = action.payload;
      return {
        ...state,
        chatIds: ids, // TODO: remove this eventually
        chatIdsByFeed: { ...state.chatIdsByFeed, [feedName]: ids },
      };
    }
    case 'CHATS_UPDATED': {
      const { ids, feedName } = action.payload;
      return {
        ...state,
        chatIds: ids,
        chatIdsByFeed: { ...state.chatIdsByFeed, [feedName]: ids },
      };
    }
    case 'CHATS_REMOVED': {
      const { ids, feedName } = action.payload;
      return {
        ...state,
        chatIds: ids,
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

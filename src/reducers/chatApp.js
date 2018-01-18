const defaultState = {
  chatIds: [],
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
      const { ids } = action.payload;
      return {
        ...state,
        chatIds: ids,
      };
    }
    case 'CHATS_UPDATED': {
      const { ids } = action.payload;
      return {
        ...state,
        chatIds: ids,
      };
    }
    case 'CHATS_REMOVED': {
      const { ids } = action.payload;
      return {
        ...state,
        chatIds: ids,
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

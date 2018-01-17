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
      const { newChats } = action.payload;
      const newIds = newChats.map(chat => chat.id);
      return {
        ...state,
        chatIds: newIds,
      };
    }
    case 'CHATS_REORDERED': {
      const { chatIds } = action.payload;
      return {
        ...state,
        chatIds,
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

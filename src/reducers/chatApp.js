const defaultState = {
  chatIds: [],
  selectedChat: undefined
};

// chat Ids are in reverse order, with oldest being at the end

const chatApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        chatIds: [chatId, ...state.chatIds.filter(id => id !== chatId)]
      };
    }
    case 'CHAT_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        chatIds: [chatId, ...state.chatIds.filter(id => id !== chatId)]
      };
    }
    case 'CHAT_SELECTED': {
      const { chatId } = action.payload;
      return {
        ...state,
        selectedChat: chatId
      };
    }
    default:
      return state;
  }
};

export default chatApp;
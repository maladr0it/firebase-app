const defaultState = {
  selectedChatId: undefined,
  // 6PVhc2zNVm7AVpK3yEEg
  chatIds: []
};

// chat Ids are in reverse order, with oldest being at the end

const chatApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_ADDED': {
      const { chatId } = action.payload;
      return {
        ...state,
        chatIds: [chatId, ...state.chatIds]
      };
    }
    case 'CHAT_UPDATED': {
      const { chatId } = action.payload;
      return {
        ...state,
        chatIds: [chatId, ...state.chatIds.filter(id => id !== chatId)]
      };
    }
    default:
      return state;
  }
};

export default chatApp;
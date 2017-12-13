const defaultState = {
  selectedChatId: undefined,
  // 6PVhc2zNVm7AVpK3yEEg
  chatIds: []
};

// chat Ids are in reverse order, with oldest being at the end

const chatApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_SELECTED': {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        selectedChatId: chatId
      });
    }
    case 'CHAT_ADDED': {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        chatIds: [chatId, ...state.chatIds]
      });
    }
    case 'CHAT_UPDATED': {
      const { chatId } = action.payload;
      // move to front.  replace with lodash func?
      const newChatIds = [chatId].concat(state.chatIds.filter(id => id !== chatId));
      return Object.assign({}, state, {
        chatIds: newChatIds
      });
    }
    default:
      return state;
  }
};

export default chatApp;
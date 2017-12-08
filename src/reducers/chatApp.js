const defaultState = {
  selectedChatId: undefined,
  // 6PVhc2zNVm7AVpK3yEEg
  chatIds: []
}

const chatApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_SELECTED': {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        selectedChatId: chatId
      })
    }
    case 'CHAT_ADDED': {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        chatIds: [...state.chatIds, chatId]
      });
    }
    default:
      return state;
  }
};

export default chatApp;
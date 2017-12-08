const defaultState = {
  selectedChatId: '6PVhc2zNVm7AVpK3yEEg',
  chatIds: ['6PVhc2zNVm7AVpK3yEEg', 'zzz']
}

const chatApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHAT_SELECTED': {
      const { chatId } = action.payload;

      return Object.assign({}, state, {
        selectedChatId: chatId
      })
    }
    default:
      return state;
  }
};

export default chatApp;
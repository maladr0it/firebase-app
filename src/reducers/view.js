const defaultState = {
  selectedChatId: '6PVhc2zNVm7AVpK3yEEg'
}

const view = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_CHAT': {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        selectedChatId: chatId
      })
    }
    default:
      return state;
  }
};

export default view;
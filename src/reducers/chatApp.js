const defaultState = {
  selectedChatId: undefined,
  // 6PVhc2zNVm7AVpK3yEEg
  chatIds: []
}


// SICK method for re-ordering the chats!
// const newId = "123";
// const sorted = [newId].concat(old.filter(item => item !== newId));

// [messageId].concat(state.messageIds.filter(id => id !== messageId))

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
        chatIds: [...state.chatIds, chatId]
      });
    }
    case 'CHAT_UPDATED': {
      const { chatId } = action.payload;
      console.log(`///${chatId} was updated`);
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
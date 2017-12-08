// example
// chats = {
//   chat94109810: {
//     createdAt: 90840118,
//     lastUpdated: 1930581,
//     messageIds: ['msg29401', 'msg49081', 'mgs02821']
//   },
//   chat49001914: {
//     createdAt: 91901084,
//     lastUpdated: 91019810,
//     messageIds: ['msg91914', 'msg59101', 'msg92001']
//   }
// }

const chat = (state, action) => {
  switch(action.type) {
    case 'MESSAGE_ADDED': {
      const { chatId, messageId } = action.payload;
      return Object.assign({}, state, {
        messageIds: [...state.messageIds, messageId]
      });
    }
    default:
      return state;
  }
};
// 6PVhc2zNVm7AVpK3yEEg
const defaultState = {
  // 'cht01': {
  //   name: 'CHAT 1',
  //   messageIds: []
  // },
  // 'cht02': {
  //   name: 'CHAT 2',
  //   messageIds: []
  // }
};

const chats = (state = defaultState, action) => {
  switch(action.type) {
    case 'CHAT_ADDED' : {
      const { chatId, chatData } = action.payload;
      return Object.assign({}, state, {
        // this is hacks for now
        [chatId]: {messageIds: []}
      });
    }
    case 'MESSAGE_ADDED' : {
      const { chatId, messageId } = action.payload;
      return Object.assign({}, state, {
        [chatId]: chat(state[chatId], action)
      });
    }
    default:
      return state;
  }
};

export default chats;
// example
// chats = {
//   chat94109810: {
//     createdAt: 90840118,
//     lastUpdated: 1930581,
//     messageIds: ['msg29401', 'msg49081', 'mgs02821']
//     userIds: ['usr0001', 'usr0002', 'usr0003']
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
      const { messageId } = action.payload;
      return Object.assign({}, state, {
        messageIds: [...state.messageIds, messageId]
      });
      return state;
    }
    case 'USER_ADDED_TO_CHAT': {
      const { userId } = action.payload;
      return Object.assign({}, state, {
        userIds: [...state.userIds, userId]
      });
    }
    default:
      return state;
  }
};
// 6PVhc2zNVm7AVpK3yEEg
const defaultState = {};

const chats = (state = defaultState, action) => {
  switch(action.type) {
    case 'CHAT_ADDED' : {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        // this is hacks for now
        [chatId]: {messageIds: [], userIds: []}
      });
    }
    case 'MESSAGE_ADDED' : {
      const { chatId } = action.payload;
      return Object.assign({}, state, {
        [chatId]: chat(state[chatId], action)
      });
    }
    case 'USER_ADDED_TO_CHAT' : {
      const { chatId, userId } = action.payload;
      return Object.assign({}, state, {
        [chatId]: chat(state[chatId], action)
      });
      return state;
    }
    default:
      return state;
  }
};

export default chats;
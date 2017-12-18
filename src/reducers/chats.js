// example
// chats = {
//   chat94109810: {
//     createdAt: 90840118,
//     lastUpdated: 1930581,
// !!! isUnread
//     messageIds: ['msg29401', 'msg49081', 'mgs02821']
//     userIds: ['usr0001', 'usr0002', 'usr0003']
//   },
//   chat49001914: {
//     createdAt: 91901084,
//     lastUpdated: 91019810,
//     messageIds: ['msg91914', 'msg59101', 'msg92001']
//   }
// }

const chat = (state = {}, action) => {
  switch(action.type) {
    case 'CHAT_ADDED' : {
      const { chatData } = action.payload;
      return chatData;
    }
    case 'CHAT_UPDATED': {
      const { chatData } = action.payload;
      return {
        ...state,
        chatData
      };
    }
    default:
      return state;
  }
};

const defaultState = {};

const chats = (state = defaultState, action) => {
  switch(action.type) {
    case 'CHAT_ADDED' : {
      const { chatId, chatData } = action.payload;
      return {
        ...state,
        [chatId]: chat({}, action)
      };
    }
    case 'CHAT_UPDATED' : {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: chat(state[chatId], action)
      };
    }
    default:
      return state;
  }
};

export default chats;
// state is a list of messages
const defaultState = {
  isSending: false,
  id: '6PVhc2zNVm7AVpK3yEEg', // your currently selected chat
  messages: []
};

// use this to modify the messages branch based on action
// const messages = (state = []) => {
//   switch (action.type) {
//     case 'ADD_MESSAGE': {
//       return state.concat(action.payload.message);
//     }
//     case 'ADD_MESSAGES': {
//       return [
//         ...state,

//       ]
//     }
//   }
// };

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case 'MESSAGE_SEND_REQUEST': {
      console.log('sending...');
      return state;
    }
    // is this needed?
    // case 'MESSAGE_SEND_SUCCESS': {
    //   console.log('successfully sent');
    //   return state;
    // }
    case 'MESSAGE_SEND_FAILURE': {
      return state;
    }
    case 'ADD_MESSAGE': {
      console.log('adding message');
      const { message } = action.payload;
      return Object.assign({}, state, {
        messages: state.messages.concat(message)
      });
    }
    case 'ADD_MESSAGES': {
      console.log('adding messages');
      const { messages } = action.payload;
      return Object.assign({}, state, {
        messages: state.messages.concat(messages)
      });
    }
    // consider naming here..
    case 'FETCH_MESSAGES': {
      console.log('requesting messages...');
      return state;
    }
    default:
      return state;
  }
};

export default chat;
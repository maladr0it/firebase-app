// state is a list of messages
const defaultState = {
  id: '6PVhc2zNVm7AVpK3yEEg', // your currently selected chat
  messageIds: [],
  messages: {}
};

// consider reducer for messages
// consider reducer for message (overkill probs)

const chat = (state = defaultState, action) => {
  switch (action.type) {
    // add new message data, and append its ID to the list
    case 'MESSAGE_ADDED': {
      // little hard to follow
      const { id, message, isPending } = action.payload;
      // adding meta isPending
      const newMessage = {
        ...message,
        isPending
      }
      return Object.assign({}, state, {
        messageIds: [...state.messageIds, id],
        messages: {
          ...state.messages,
          [id]: newMessage}
      });
    }
    // mark specified message as sent
    // overwrite it with what the server sent back
    // aka newMessage
    case 'MESSAGE_SEND_SUCCEEDED': {
      const { id, sentMessage } = action.payload;
      const updatedMessage = {
        ...sentMessage,
        isPending: false
      }
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [id]: updatedMessage
        }
      });
    }
    default:
      return state;
  }
};


// const messages = (state = defaultState.messages) => {
//   switch (action.type) {
//     case 'ADD_MESSAGE': {
//       return
//     }
//     case 'MESSAGE_SEND_SUCCESS': {
//       const { messageId } = action.payload;
      
//       return Object.assign({}, state, {
//         messageId: 
//       })
//       // mark message as isPending: false
//     }
//   }
// }


// const message = (message, action) => {
//   switch (action.type) {
//     case 'MESSAGE_ADDED': {
//       const { isPending } = action.payload;
//       return Object.assign({}, message, {
//         isPending
//       })
//     }
//   }

//   switch (action.type) {
//     case 'MESSAGE_SEND_SUCCESS': {
//       const { sentMessage } = action.payload;
//       return Object.assign({}, sentMessage, {
//         isPending: false
//       });
//     }
//   }
// };

export default chat;
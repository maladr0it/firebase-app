// state is a list of messages
const defaultState = {
  id: '6PVhc2zNVm7AVpK3yEEg', // your currently selected chat
  messageIds: [],
  messages: {}
};

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      // little hard to follow
      const { id, message, isPending } = action.payload;
      // adding meta isPending
      const newMessage = {
        ...message,
        isPending
      }
      return Object.assign({}, state, {
        messageIds: [...state.messageIds, id],
        messages: {...state.messages, [id]: newMessage}
      });
    }
    // remember the alamo
    case 'MESSAGE_SENT': {

    }
    default:
      return state;
  }
};

export default chat;

// messages should be a hash!


// store messages in a hash to access them later?
// use key?
// message = { text: 'hi', pending: true }

// use this to modify the messages branch based on action
// const messages = (state = []) => {
//   
// };
//
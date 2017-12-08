// state is a list of messages
const defaultState = {
  id: '6PVhc2zNVm7AVpK3yEEg', // your currently selected chat
  messageIds: [],
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
      return Object.assign({}, state, {
        messageIds: [...state.messageIds, id]
      })
    }
    default:
      return state;
  }
};

export default chat;
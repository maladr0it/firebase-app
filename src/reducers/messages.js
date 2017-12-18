// example state
// messages = {
//   msg10814: { text: 'hi', isPending: false },
//   msg10948: { text: 'howdy!, isPending: true }
// }

const defaultState = { };

const messages = (state = defaultState, action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED': {
      const { messageId, messageData, isPending } = action.payload;
      // adding meta isPending
      const message = { ...messageData, isPending};
      return {
        ...state,
        [messageId]: message
      };
    }
    // this overwrites the original message with what the server returns
    case 'MESSAGE_SENT': {
      const { messageId, messageData } = action.payload;
      // adding meta isPending
      const message = {...messageData, isPending: false}
      return {
        ...state,
        [messageId]: message
      };
    }
    default:
      return state;
  }
};

export default messages;
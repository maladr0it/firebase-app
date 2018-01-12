// example state
// messages = {
//   msg10814: { text: 'hi', isPending: false },
//   msg10948: { text: 'howdy!, isPending: true }
// }

const defaultState = { };

const messages = (state = defaultState, action) => {
  switch (action.type) {
    case 'MESSAGE_ADDED': {
      const { messageId, messageData } = action.payload;
      return {
        ...state,
        [messageId]: messageData,
      };
    }
    case 'MESSAGE_UPDATED': {
      const { messageId, messageData } = action.payload;
      console.log(messageData);
      // TODO: clean up this logic
      // set pending to false, so setting a message as 'read'
      // does not require a callback
      return {
        ...state,
        [messageId]: { ...messageData, isPending: false },
      };
    }
    // this overwrites the original message with what the server returns
    case 'MESSAGE_SENT': {
      const { messageId, messageData } = action.payload;
      return {
        ...state,
        [messageId]: { ...messageData, isPending: false },
      };
    }
    default:
      return state;
  }
};
export default messages;

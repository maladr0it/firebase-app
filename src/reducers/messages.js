// example
// messages = {
//   msg10814: { author: 'usr191901', text: 'hi', isPending: false },
//   msg10948: { author: 'usr177154', text: 'howdy!, isPending: true }
// };

const defaultState = { };

const messages = (state = defaultState, action) => {
  switch (action.type) {
    case 'MESSAGES_ADDED': {
      const { newMessages } = action.payload;
      const messagesData = newMessages.reduce((acc, messageDoc) => {
        acc[messageDoc.id] = messageDoc.data;
        return acc;
      }, {});
      return {
        ...state,
        ...messagesData,
      };
    }
    case 'MESSAGES_UPDATED': {
      const { updatedMessages } = action.payload;
      const messagesData = updatedMessages.reduce((acc, messageDoc) => {
        acc[messageDoc.id] = messageDoc.data;
        return acc;
      }, {});
      return {
        ...state,
        ...messagesData,
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

export const getMessages = (state, ids) => (
  ids.map(id => ({
    id,
    ...state[id],
  }))
);

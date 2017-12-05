// state is a list of messages

const chat = (state = [], action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return [
        ...state,
        {
          text: action.payload.text
        }
      ];
    default:
      return state;
  }
};

export default chat;
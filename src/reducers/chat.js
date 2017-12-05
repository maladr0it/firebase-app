// state is a list of messages

const chat = (state = [{text: 'hello'}, {text: 'fam'}], action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      console.log(action);
      console.log(state);
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
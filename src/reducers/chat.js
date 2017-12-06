// state is a list of messages
const defaultState = {
  isSending: false,
  messages: [{ text: 'hello' }, { text: 'fam' }]
};

// use this to modify the messages branch based on action
const messages = (state = []) => {

}

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return Object.assign({}, state, {
        messages: state.messages.concat({
          text: action.payload.text
        })
      });
    case 'MESSAGE_SEND_REQUEST':
      console.log('sending...');
      return Object.assign({}, state, {
        isSending: true
      });
    case 'MESSAGE_SEND_SUCCESS':
      console.log('successfully sent');
      return Object.assign({}, state, {
        isSending: false
      });
    case 'MESSAGE_SEND_FAILURE':
      console.log('message send failed', action.payload.error);
      return Object.assign({}, state, {
        isSending: false
      });
    default:
      return state;
  }
};

export default chat;
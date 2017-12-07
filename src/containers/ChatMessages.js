import { connect } from 'react-redux';

import MessageList from '../components/MessageList';

// SELECTORS

// selects appropriate array of messages based on indexlist
// this will eventually take chatId as an argument
const selectMessages = (state, messageIds) => {
  return messageIds.map(id => state.chat.messages[id]);
};


const mapStateToProps = state => ({
  messages: selectMessages(state, state.chat.messageIds)
});

const ChatMessages = connect(
  mapStateToProps
)(MessageList);

export default ChatMessages;
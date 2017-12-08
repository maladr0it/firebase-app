import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

// SELECTORS

// selects appropriate array of messages based on indexlist
const selectMessages = (state, messageIds) => {
  return messageIds.map(id => state.messages[id]);
};


const mapStateToProps = state => ({
  messages: selectMessages(state, state.chat.messageIds)
});

const MessageListContainer = connect(
  mapStateToProps
)(MessageList);

export default MessageListContainer;
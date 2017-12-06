import { connect } from 'react-redux';

import MessageList from '../components/MessageList';

const mapStateToProps = state => ({
  messages: state.chat.messages
});

const ChatMessages = connect(
  mapStateToProps
)(MessageList);

export default ChatMessages;
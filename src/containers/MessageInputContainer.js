import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import MessageInput from '../components/MessageInput';


const mapStateToProps = state => ({
  userId: state.user.id,
  chatId: state.chat.id
});

const mapDispatchToProps = dispatch => ({
  onSend: (chatId, userId, text) => {
    dispatch(sendMessage(chatId, userId, text));
  }
});

const MessageInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);

export default MessageInputContainer;
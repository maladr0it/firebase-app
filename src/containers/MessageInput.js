import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import MessageInputForm from '../components/MessageInputForm';


const mapStateToProps = state => ({
  userId: state.user.id,
  chatId: state.chat.id
});

const mapDispatchToProps = dispatch => ({
  onSend: (chatId, userId, text) => {
    dispatch(sendMessage(chatId, userId, text));
  }
});

const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInputForm);

export default MessageInput;
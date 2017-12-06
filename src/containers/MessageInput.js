import { connect } from 'react-redux';
import { requestSendMessage } from '../actions';
import MessageInputForm from '../components/MessageInputForm';


const mapDispatchToProps = dispatch => (
  {
    onSend: text => {
      dispatch(requestSendMessage(text));
    }
  }
);

const MessageInput = connect(
  null,
  mapDispatchToProps
)(MessageInputForm);

export default MessageInput;
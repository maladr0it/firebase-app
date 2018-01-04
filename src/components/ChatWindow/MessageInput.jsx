import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
  sendMessage,
  draftTextUpdated,
  startTyping,
} from '../../actions';
import './index.css';

class MessageInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.debouncedChange = debounce((chatId, text) => {
      this.props.onChange(chatId, text);
    }, 250);
  }
  componentWillReceiveProps(nextProps) {
    // get draft text
    // TODO: shouldn't call setState in CWU
    if (this.props.chatId !== nextProps.chatId) {
      this.setState({ value: nextProps.draftText });
    }
  }
  handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e);
    }
  }
  handleChange(e) {
    const text = e.target.value;
    this.setState({ value: text });
    this.props.onStartTyping(this.props.userId, this.props.chatId);
    this.debouncedChange(this.props.chatId, text);
  }
  handleSubmit(e) {
    this.props.onSend(this.props.chatId, this.props.userId, this.state.value);
    this.setState({ value: '' });
    // update store to clear draft
    this.props.onChange(this.props.chatId, '');
    e.preventDefault();
  }

  render() {
    return (
      <form className="MessageComposer" onSubmit={e => this.handleSubmit(e)}>
        <TextField
          className="MessageInput"
          hintText="Send a message..."
          multiLine
          rows={1}
          rowsMax={4}
          onKeyPress={e => this.handleKeyDown(e)}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <FlatButton label="SEND" type="submit" />
      </form>
    );
  }
}

const selectChat = (state, chatId) => {
  return state.chats[chatId] || { draftText: '' };
};

const mapStateToProps = state => ({
  userId: state.user.userId,
  chatId: state.chatApp.selectedChat,
  draftText: selectChat(state, state.chatApp.selectedChat).draftText,
});
const mapDispatchToProps = {
  onSend: sendMessage,
  onChange: draftTextUpdated,
  onStartTyping: startTyping,
  // stopTyping
};
const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageInputComponent);

export default MessageInput;

MessageInputComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  draftText: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func.isRequired,
};

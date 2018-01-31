import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce, throttle } from 'lodash';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { getChat } from '../../reducers/chats';
import {
  sendMessage,
  draftTextUpdated,
  startTyping,
  stopTyping,
} from '../../actions';
import './index.css';

class MessageInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.debouncedUpdateDraft = debounce((chatId, text) => {
      this.props.updateDraft(chatId, text);
    }, 250);
    this.debouncedStopTyping = debounce((userId, chatId) => {
      this.props.onStopTyping(userId, chatId);
    }, 2000);
    this.throttledStartTyping = throttle((userId, chatId) => {
      this.props.onStartTyping(userId, chatId);
    }, 2000);
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
    // TODO: consider checking local state for whether you are typing or not
    this.debouncedUpdateDraft(this.props.chatId, text);
    this.throttledStartTyping(this.props.userId, this.props.chatId);
    this.debouncedStopTyping(this.props.userId, this.props.chatId);
  }
  handleSubmit(e) {
    this.props.onSend(this.props.chatId, this.props.userId, this.state.value);
    this.setState({ value: '' });
    // cancel debounced draft update so it doens't overwrite the clear
    this.debouncedUpdateDraft.cancel();
    // update store to clear draft
    this.props.updateDraft(this.props.chatId, '');
    this.props.onStopTyping(this.props.userId, this.props.chatId);
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
const mapStateToProps = state => ({
  userId: state.user.userId,
  chatId: state.chatApp.selectedChat,
  draftText: getChat(state.chats, state.chatApp.selectedChat).draftText,
});
const mapDispatchToProps = {
  onSend: sendMessage,
  updateDraft: draftTextUpdated,
  onStartTyping: startTyping,
  onStopTyping: stopTyping,
};
const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageInputComponent);

export default MessageInput;

MessageInputComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  chatId: PropTypes.string,
  draftText: PropTypes.string,
  updateDraft: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
};
MessageInputComponent.defaultProps = {
  chatId: '',
  draftText: '',
};

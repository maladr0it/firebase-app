import React from 'react';
import { connect } from 'react-redux';
import {
  sendMessage,
  draftTextUpdated,
  startTyping
} from '../../actions';
import { debounce } from 'lodash';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

class MessageInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.debouncedChange = debounce((chatId, text) => {
      this.props.onChange(chatId, text);
    }, 250);
  }
  handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e);
    }
  }
  handleChange(e) {
    const text = e.target.value;
    this.setState({ value: text });
    this.props.startTyping(this.props.userId, this.props.chatId);
    this.debouncedChange(this.props.chatId, text);
  }
  handleSubmit(e) {
    this.props.onSend(this.props.chatId, this.props.userId, this.state.value);
    this.setState({ value: '' });
    // update store to clear draft
    this.props.onChange(this.props.chatId, '');
    e.preventDefault();
  }
  componentWillUpdate(nextProps) {
    // get draft text
    if (this.props.chatId !== nextProps.chatId) {
      this.setState({ value: nextProps.draftText });
    }
  }

  render() {
    return (
      <form className='MessageComposer' onSubmit={e => this.handleSubmit(e)}>
        <TextField
          className='MessageInput'
          hintText='Send a message...'
          multiLine={true}
          rows={1}
          rowsMax={4}
          onKeyPress={e => this.handleKeyDown(e)}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <FlatButton label='SEND' type='submit' />
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
  draftText: selectChat(state, state.chatApp.selectedChat).draftText
});
const mapDispatchToProps = {
  onSend: sendMessage,
  onChange: draftTextUpdated,
  startTyping,
  // stopTyping
};
const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInputComponent);

export default MessageInput;
import React from 'react';
import { connect } from 'react-redux';
import {
  sendMessage,
  draftTextUpdated
} from '../../actions';
import { debounce } from 'lodash';

import InputForm from '../InputForm';
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
  handleChange(e) {
    const text = e.target.value;
    this.setState({ value: text });
    this.debouncedChange(this.props.chatId, text);
  }
  handleSubmit(e) {
    this.props.onSend(this.props.chatId, this.props.userId, this.state.value);
    this.setState({ value: '' });
    // update store to clear draft
    this.props.onChange(this.props.chatId, '');
    e.preventDefault();
  }
  componentDidUpdate(prevProps) {
    // get draft 
    if (prevProps.chatId !== this.props.chatId) {
      this.setState({ value: this.props.draftText });
    }
  }

  render() {
    return (
      <form className='MessageInput' onSubmit={e => this.handleSubmit(e)}>
        <textarea type='text' className='MessageTextInput'
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        ></textarea>
        <input type='submit' value='SEND' />
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
  onChange: draftTextUpdated
};
const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInputComponent);

export default MessageInput;
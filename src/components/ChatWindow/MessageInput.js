import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions';
import InputForm from '../InputForm';

const MessageInputComponent = ({ chatId, userId, onSend }) => {
  return (
    <InputForm
      label=''
      handleSubmit={text => onSend(chatId, userId, text)}
    />
  );
};
const mapStateToProps = state => ({
  userId: state.user.userId,
  chatId: state.chatApp.selectedChat
});
const mapDispatchToProps = {
  onSend: sendMessage
};
const MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInputComponent);

export default MessageInput;
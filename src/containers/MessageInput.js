import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';

const InputForm = ({ onSend }) => {
  let input;
  
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSend(input.value);
        input.value = '';
      }}
    >
      <input
        ref={node => {
          input = node;
        }}
      />
      <button type='submit'>
        SEND
      </button>
    </form>
  );
}

const mapDispatchToProps = dispatch => (
  {
    onSend: text => {
      dispatch(sendMessage(text));
    }
  }
);

const MessageInput = connect(
  null,
  mapDispatchToProps
)(InputForm);

export default MessageInput;
import React from 'react';
import { connect } from 'react-redux';
import { addChatParticipant } from '../../actions';
import InputForm from '../InputForm';

const AddUserFormComponent = ({ chatId, onAdd }) => {
  return (
    <InputForm
      label='ADD USER: '
      handleSubmit={userId => onAdd(chatId, userId)}
    />
  );
};

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat
});
const mapDispatchToProps = {
  onAdd: addChatParticipant
};
const AddUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserFormComponent);

export default AddUserForm;
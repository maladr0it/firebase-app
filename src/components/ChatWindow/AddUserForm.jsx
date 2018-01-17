import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserToChat } from '../../actions';
import InputForm from '../InputForm';

const AddUserFormComponent = ({ chatId, onAdd }) => (
  <InputForm
    label="ADD USER: "
    handleSubmit={userId => onAdd(chatId, userId)}
  />
);

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat,
});
const mapDispatchToProps = {
  onAdd: addUserToChat,
};
const AddUserForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUserFormComponent);

export default AddUserForm;

AddUserFormComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};

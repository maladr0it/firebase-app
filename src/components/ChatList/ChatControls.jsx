import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputForm from '../InputForm';
import {
  createChat,
  filterApplied,
} from '../../actions';

const ChatControlsComponent = ({
  onAdd, onFilterApplied, userId,
}) => (
  <div>
    <button onClick={() => onAdd(userId)}>
      NEW CHANNEL
    </button>
    <InputForm
      label="FILTER:"
      handleSubmit={filter => onFilterApplied(filter)}
    />
  </div>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = {
  onAdd: createChat,
  onFilterApplied: filterApplied,
};
const ChatControls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatControlsComponent);
export default ChatControls;

ChatControlsComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onFilterApplied: PropTypes.func.isRequired,
};

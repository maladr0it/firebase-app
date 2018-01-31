import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createChat,
  filterAdded,
} from '../../actions';

import InputForm from '../InputForm';

const ChatControlsComponent = ({
  onAdd, onFilterAdded, userId,
}) => (
  <div>
    <button onClick={() => onAdd(userId)}>
      NEW CHANNEL
    </button>
    <InputForm
      label="FILTER:"
      handleSubmit={filter => onFilterAdded(filter)}
    />
  </div>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = {
  onAdd: createChat,
  onFilterAdded: filterAdded,
};
const ChatControls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatControlsComponent);
export default ChatControls;

ChatControlsComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onFilterAdded: PropTypes.func.isRequired,
};

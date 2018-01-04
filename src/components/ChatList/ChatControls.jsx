import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createChat,
} from '../../actions';

const ChatControlsComponent = ({ onAdd, userId }) => (
  <div>
    <button onClick={() => onAdd(userId)}>
      NEW CHANNEL
    </button>
  </div>
);
const mapStateToProps = state => ({
  userId: state.user.userId,
});
const mapDispatchToProps = {
  onAdd: createChat,
};
const ChatControls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatControlsComponent);
export default ChatControls;

ChatControlsComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};

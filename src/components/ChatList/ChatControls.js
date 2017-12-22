import React from 'react';
import { connect } from 'react-redux';
import {
  createChat
} from '../../actions';

const ChatControlsComponent = ({ onAdd, onLogout, userId }) => {
  return (
    <div>
      <button onClick={() => onAdd(userId)}>
        NEW CHANNEL
      </button>
    </div>
  );
};
const mapStateToProps = state => ({
  userId: state.user.userId
});
const mapDispatchToProps = {
  onAdd: createChat
};
const ChatControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatControlsComponent);

export default ChatControls;



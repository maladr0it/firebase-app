import React from 'react';
import { connect } from 'react-redux';
import {
  createChat, logout
} from '../../actions';

const ChatControlsComponent = ({ onAdd, onLogout, userId }) => {
  return (
    <div style={{background: '#79ADDC'}}>
      LOGGED IN AS: {userId}
      <button onClick={() => onAdd(userId)}>
        NEW CHANNEL
      </button>
      <button onClick={() => onLogout()}>
        LOG OUT
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.user.userId
});
const mapDispatchToProps = {
  onAdd: createChat,
  onLogout: logout
};
const ChatControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatControlsComponent);

export default ChatControls;



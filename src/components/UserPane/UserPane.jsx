import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatView } from '../../reducers/chatViews';

import UserProfile from './UserProfile';
import ReservationsList from './ReservationsList';

import './index.css';

const UserPaneComponent = ({
  detailViewType, selectedUserId,
}) => (
  <div className="UserPane">
    {(detailViewType === 'USER') ? (
      <React.Fragment>
        <UserProfile userId={selectedUserId} />
        <ReservationsList userId={selectedUserId} />
      </React.Fragment>
    ) : (
      ''
    )}
  </div>
);
const mapStateToProps = (state) => {
  const { selectedChat } = state.chatApp;
  const {
    detailViewType, selectedUserId,
  } = getChatView(state.chatViews, selectedChat);
  return {
    detailViewType,
    selectedUserId,
  };
};
const UserPane = connect(
  mapStateToProps,
  null,
)(UserPaneComponent);
export default UserPane;

UserPaneComponent.propTypes = {
  detailViewType: PropTypes.string,
  selectedUserId: PropTypes.string,
};
UserPaneComponent.defaultProps = {
  detailViewType: '',
  selectedUserId: '',
};

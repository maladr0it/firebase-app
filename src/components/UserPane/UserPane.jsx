import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatView } from '../../reducers/chatViews';

import UserProfile from './UserProfile';
import ReservationsList from './ReservationsList';
import ReservationDetail from './ReservationDetail';

import './index.css';

const UserPaneComponent = ({
  detailViewType, selectedUserId, selectedReservationId,
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
    {(detailViewType === 'RESERVATION') ? (
      <React.Fragment>
        <ReservationDetail reservationId={selectedReservationId} />
      </React.Fragment>
    ) : (
      ''
    )}
  </div>
);
const mapStateToProps = (state) => {
  const { selectedChat } = state.chatApp;
  const {
    detailViewType, selectedUserId, selectedReservationId,
  } = getChatView(state.chatViews, selectedChat);
  return {
    detailViewType,
    selectedUserId,
    selectedReservationId,
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
  selectedReservationId: PropTypes.string,
};
UserPaneComponent.defaultProps = {
  detailViewType: '',
  selectedUserId: '',
  selectedReservationId: '',
};

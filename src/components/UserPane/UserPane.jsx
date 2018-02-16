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
}) => {
  const renderMap = {
    // TODO: make these render funcs
    USER: () => (
      <React.Fragment>
        <UserProfile userId={selectedUserId} />
        <ReservationsList userId={selectedUserId} />
      </React.Fragment>
    ),
    RESERVATION: () => (
      <ReservationDetail reservationId={selectedReservationId} />
    ),
    default: () => (
      <div>Nothing...</div>
    ),
  };
  return (
    <div className="UserPane">
      {(renderMap[detailViewType] || renderMap.default)()}
    </div>
  );
};
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

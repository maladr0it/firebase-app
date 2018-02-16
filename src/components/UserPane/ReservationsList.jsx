import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/users';
import { getReservations } from '../../reducers/reservations';
import {
  createReservation,
  reservationSelected,
} from '../../actions';

const ReservationListComponent = ({
  chatId, userId, reservations,
  onCreateReservation, onSelectReservation,
}) => (
  <div>
    <p>reservations: </p>
    <ul>
      {reservations.map(res => (
        <li
          key={res.id}
          onClick={() => onSelectReservation(chatId, res.id)}
        >
          ID: {res.id}
          {res.description}
        </li>
      ))}
    </ul>
    <button
      onClick={() => onCreateReservation(userId, 'DO THE THING')}
    >
      NEW_RESERVATION
    </button>
  </div>
);
const mapStateToProps = (state, ownProps) => {
  const { reservationIds } = getUser(state.users, ownProps.userId);
  return {
    chatId: state.chatApp.selectedChat,
    reservations: getReservations(state.reservations, reservationIds),
  };
};
const mapDispatchToProps = {
  onCreateReservation: createReservation,
  onSelectReservation: reservationSelected,
};
const ReservationList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationListComponent);
export default ReservationList;

ReservationListComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  reservations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateReservation: PropTypes.func.isRequired,
  onSelectReservation: PropTypes.func.isRequired,
};
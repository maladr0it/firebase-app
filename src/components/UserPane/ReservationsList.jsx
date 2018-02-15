import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReservations } from '../../reducers/reservations';
import {
  createReservation,
} from '../../actions';

const ReservationListComponent = ({
  userId, reservations, onCreateReservation,
}) => (
  <div>
    <p>reservations: </p>
    <ul>
      {reservations.map(res => <li key={res.id}>{res.description}</li>)}
    </ul>
    <button
      onClick={() => onCreateReservation(userId, 'DO THE THING')}
    >
      NEW_RESERVATION
    </button>
  </div>
);
const mapStateToProps = (state, ownProps) => ({
  reservations: getReservations(state.reservations, ownProps.reservationIds),
});
const mapDispatchToProps = {
  onCreateReservation: createReservation,
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
};

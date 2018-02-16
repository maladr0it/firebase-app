import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getReservation } from '../../reducers/reservations';

import DatePicker from '../DatePicker';

// needs local state for input fields

const ReservationDetailComponent = () => {
  return (
    <DatePicker />
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...getReservation(state.reservations, ownProps.reservationId),
});
const ReservationDetail = connect(
  mapStateToProps,
  null,
)(ReservationDetailComponent);
export default ReservationDetail;

ReservationDetailComponent.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  description: PropTypes.string,
};
ReservationDetailComponent.defaultProps = {
  createdAt: '',
  description: '',
};

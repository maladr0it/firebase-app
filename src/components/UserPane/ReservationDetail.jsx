import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReservation } from '../../reducers/reservations';

const ReservationDetailComponent = ({
  description,
}) => (
  <div>
    {description}
  </div>
);
const mapStateToProps = (state, ownProps) => ({
  ...getReservation(state.reservations, ownProps.reservationId),
});
const ReservationDetail = connect(
  mapStateToProps,
  null,
)(ReservationDetailComponent);
export default ReservationDetail;

ReservationDetailComponent.propTypes = {
  description: PropTypes.string,
};
ReservationDetailComponent.defaultProps = {
  description: '',
};

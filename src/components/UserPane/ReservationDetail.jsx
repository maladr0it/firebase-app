import React from 'react';
import PropTypes from 'prop-types';

const ReservationDetailComponent = ({
  description,
}) => (
  <div>
    {description}
  </div>
);
export default ReservationDetailComponent;
ReservationDetailComponent.propTypes = {
  description: PropTypes.string,
};
ReservationDetailComponent.defaultProps = {
  description: '',
};

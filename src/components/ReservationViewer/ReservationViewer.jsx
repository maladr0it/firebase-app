import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { listenForAllReservations } from '../../actions';
import { getAllReservations } from '../../reducers/reservations';

// display every reservation on the system

// listen, but when to stop?

const ReservationViewerComponent = ({
  onOpenListener, reservations
}) => {
  const columns = [{
    Header: 'ID',
    accessor: 'id',
  }, {
    Header: 'Description',
    accessor: 'description',
  }, {
    Header: 'Reservation At',
    accessor: 'reservationAt',
    Cell: props => (props.value ?
      moment(props.value).format('ddd D MMM YYYY HH:mm') : 'No Date'
    ),
  }];

  return (
    <div>
      <ReactTable
        data={reservations}
        columns={columns}
      />
      <button onClick={() => onOpenListener()}>OPEN</button>
    </div>
  );
};
//   const reservationDescriptions = reservations.map(res => (
//     <li key={res.id}>
//       {res.description}
//     </li>
//   ));
//   console.log(reservations);
//   return (
//     <div>
//       <button onClick={() => onOpenListener()}>
//         OPEN_LISTENER
//       </button>
//       <ul>{reservationDescriptions}</ul>
//     </div>
//   );
// };
const mapStateToProps = state => ({
  reservations: getAllReservations(state.reservations),
});
const mapDispatchToProps = {
  onOpenListener: listenForAllReservations,
};
const ReservationViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationViewerComponent);
export default ReservationViewer;

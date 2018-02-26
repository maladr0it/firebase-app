import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { getUser } from '../../reducers/users';
import { getReservations } from '../../reducers/reservations';
import {
  createReservation,
  reservationSelected,
} from '../../actions';
import './index.css';

const ReservationListComponent = ({
  chatId, userId, reservations,
  onCreateReservation, onSelectReservation,
}) => {
  const orderedReservations = reservations.sort((a, b) => (
    (a.reservationAt || 0) - (b.reservationAt || 0)
  )).map(res => (
    <React.Fragment>
      <ListItem
        key={res.id}
        primaryText={res.description}
        secondaryText={res.reservationAt ?
          moment(res.reservationAt).format('ddd D MMM HH:mm') : 'None'
        }
        onClick={() => onSelectReservation(chatId, res.id)}
      />
      <Divider />
    </React.Fragment>
  ));
  return (
    <React.Fragment>
      <div className="ReservationListContainer">
        <List>
          <Subheader>Reservations</Subheader>
          {orderedReservations}
        </List>
      </div>
      <RaisedButton
        label="New Reservation"
        primary
        onClick={() => onCreateReservation(userId, '')}
      />
    </React.Fragment>
  );
};
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
  chatId: PropTypes.string.isRequired,
  reservations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateReservation: PropTypes.func.isRequired,
  onSelectReservation: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { getReservation } from '../../reducers/reservations';
import {
  updateReservation,
  deleteReservation,
  userSelected,
} from '../../actions';

import DateInput from '../DateInput';

// needs local state for input fields
class ReservationDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      address: props.address,
      reservationAt: props.reservationAt && moment(props.reservationAt),
    };
  }
  async handleSubmit(e) {
    e.preventDefault();
    let formData = this.state;
    // convert moment to date
    if (this.state.reservationAt) {
      formData = {
        ...formData,
        reservationAt: formData.reservationAt.toDate(),
      };
    }
    await this.props.onUpdateReservation(this.props.reservationId, formData);
    this.props.onBack(this.props.chatId, this.props.userId);
  }
  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <IconButton onClick={() => (
            this.props.onBack(this.props.chatId, this.props.userId)
          )}
        >
          <ArrowBack />
        </IconButton>
        <form
          onSubmit={e => this.handleSubmit(e)}
        >
          <p>created At: {this.props.createdAt.toString()}</p>
          <TextField
            hintText="Description"
            floatingLabelText="Description"
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          />
          <TextField
            hintText="Address"
            floatingLabelText="Address"
            name="address"
            value={this.state.address}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          />
          <ReactDatePicker
            customInput={<DateInput />}
            selected={this.state.reservationAt}
            onChange={value => this.handleChange('reservationAt', value)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="ddd D MMM YYYY HH:mm"
          />
          <RaisedButton
            label="Submit"
            type="submit"
            primary
          />
          <RaisedButton
            onClick={async () => {
              await this.props.onDeleteReservation(this.props.reservationId);
              this.props.onBack(this.props.chatId, this.props.userId);
            }}
            label="Delete"
            secondary
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const chatId = state.chatApp.selectedChat;
  return {
    userId: state.chatViews[chatId].selectedUserId,
    chatId,
    ...getReservation(state.reservations, ownProps.reservationId),
  };
};
const mapDispatchToProps = {
  onUpdateReservation: updateReservation,
  onDeleteReservation: deleteReservation,
  onBack: userSelected,
};
const ReservationDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationDetailComponent);
export default ReservationDetail;

ReservationDetailComponent.propTypes = {
  onUpdateReservation: PropTypes.func.isRequired,
  onDeleteReservation: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  reservationId: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  reservationAt: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  address: PropTypes.string,
};
ReservationDetailComponent.defaultProps = {
  reservationAt: null,
  description: '',
  address: '',
};

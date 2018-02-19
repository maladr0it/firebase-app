import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { getReservation } from '../../reducers/reservations';
import {
  updateReservation,
} from '../../actions';

// needs local state for input fields

class ReservationDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      reservationAt: moment(props.reservationAt),
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    let formData = this.state;
    // convert monent to date
    if (this.state.reservationAt) {
      formData = {
        ...formData,
        reservationAt: formData.reservationAt.toDate(),
      }
    }
    console.log(formData);
    this.props.onUpdateReservation(
      this.props.reservationId,
      formData,
    );
  }
  handleChange(name, value) {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={e => this.handleSubmit(e)}
        >
          DESC: <TextField
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          />
          created At: {this.props.createdAt.toString()}
          WHEN: <ReactDatePicker
            selected={this.state.reservationAt}
            onChange={value => this.handleChange('reservationAt', value)}
          />
          <RaisedButton
            label="Submit"
            type="submit"
            primary
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  ...getReservation(state.reservations, ownProps.reservationId),
});
const mapDispatchToProps = {
  onUpdateReservation: updateReservation,
};
const ReservationDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationDetailComponent);
export default ReservationDetail;

ReservationDetailComponent.propTypes = {
  onUpdateReservation: PropTypes.func.isRequired,
  reservationId: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  reservationAt: PropTypes.instanceOf(Date),
  description: PropTypes.string,
};
ReservationDetailComponent.defaultProps = {
  createdAt: Date(),
  reservationAt: Date(),
  description: '',
};

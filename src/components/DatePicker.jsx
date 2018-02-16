import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class DatePicker extends React.Component {
  state = {
    startDate: moment(),
  };
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  render() {
    return (
      <ReactDatePicker
        selected={this.state.startDate}
        onChange={value => this.handleChange(value)}
      />
    );
  }
}
export default DatePicker;

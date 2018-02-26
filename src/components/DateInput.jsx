import React from 'react';
import IconButton from 'material-ui/IconButton';
import DateRangeIcon from 'material-ui/svg-icons/action/date-range';
import TextField from 'material-ui/TextField';

// is a component because React Datepicker will inject refs to it
class DateInput extends React.Component {
  render() {
    return (
      <div>
        <TextField
          hintText="Date"
          floatingLabelText="Date"
          disabled
          value={this.props.value || 'None'}
        />
        <IconButton onClick={this.props.onClick}>
          <DateRangeIcon />
        </IconButton>
      </div>
    );
  }
}
export default DateInput;

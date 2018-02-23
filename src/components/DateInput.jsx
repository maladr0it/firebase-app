import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class DateInput extends React.Component {
  render() {
    return (
      <FlatButton
        label={this.props.value || 'NONE'}
        fullWidth
        onClick={this.props.onClick}
      />
    );
  }
}
export default DateInput;

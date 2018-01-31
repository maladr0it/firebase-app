import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class InputForm extends React.Component {
  state = {
    value: '',
  };
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
    e.preventDefault();
  }
  render() {
    return (
      <form
        style={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={e => this.handleSubmit(e)}
      >
        <TextField
          hintText={this.props.label}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <FlatButton label="OK" type="submit" />
      </form>
    );
  }
}
export default InputForm;

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

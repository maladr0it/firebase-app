import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class InputForm extends React.Component {
  state = {
    value: '',
  };
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  }
  render() {
    return (
      <form
        style={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={e => this.handleSubmit(e)}
      >
        <TextField
          autoFocus={this.props.autoFocus}
          hintText={this.props.label}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
      </form>
    );
  }
}
export default InputForm;

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};
InputForm.defaultProps = {
  autoFocus: false,
};

import React from 'react';
import PropTypes from 'prop-types';

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
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="textInput">
          {this.props.label}
          <input
            id="textInput"
            type="text"
            value={this.state.value}
            onChange={e => this.handleChange(e)}
          />
        </label>
        <input type="submit" value="OK" />
      </form>
    );
  }
}
export default InputForm;

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

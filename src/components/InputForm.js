import React from 'react';

class InputForm extends React.Component {
  state = {
    value: ''
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
        <label>
          {this.props.label}:
          <input type='text'
            value={this.state.value}
            onChange={e => this.handleChange(e)} />
        </label>
        <input type='submit' value='OK' />
      </form>
    );
  };
}

export default InputForm;
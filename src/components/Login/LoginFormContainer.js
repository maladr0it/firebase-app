import { connect } from 'react-redux';
import {
  login
} from '../actions';
import LoginForm from '../components/LoginForm';

const mapStateToProps = state => ({
  userId: state.user.userId
});

const mapDispatchToProps = dispatch => ({
  onLogin: userId => {
    dispatch(login(userId));
  }
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default LoginFormContainer;

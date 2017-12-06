import { combineReducers } from 'redux';
import chat from './chat';
import user from './user';

const chatApp = combineReducers({
  chat,
  user
});

export default chatApp;
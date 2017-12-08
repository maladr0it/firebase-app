import { combineReducers } from 'redux';
import chat from './chat';
import user from './user';
import messages from './messages';

const chatApp = combineReducers({
  messages,
  chat,
  user
});

export default chatApp;
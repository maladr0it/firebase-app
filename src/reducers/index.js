import { combineReducers } from 'redux';
import chat from './chat';
// import chats from './chats';
import view from './view'
import user from './user';
import messages from './messages';

const chatApp = combineReducers({
  messages,
  chat,
  // chats,
  view,
  user
});

export default chatApp;
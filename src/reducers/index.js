import { combineReducers } from 'redux';
import user from './user';
import chatApp from './chatApp';
import chats from './chats';
import messages from './messages';

const app = combineReducers({
  user,
  chatApp,
  chats,
  messages,
});

export default app;

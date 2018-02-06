import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import chatApp from './chatApp';
import chats from './chats';
import messages from './messages';

const app = combineReducers({
  user,
  users,
  chatApp,
  chats,
  messages,
});

export default app;

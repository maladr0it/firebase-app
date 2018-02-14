import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import chatApp from './chatApp';
import chats from './chats';
import messages from './messages';
import reservations from './reservations';
import listeners from './listeners';

const app = combineReducers({
  user,
  users,
  chatApp,
  chats,
  messages,
  reservations,
  listeners,
});

export default app;

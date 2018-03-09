import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import chatApp from './chatApp';
import chats from './chats';
import chatViews from './chatViews';
import messages from './messages';
import reservations from './reservations';
import listeners from './listeners';
import flightSearchResults from './flightSearchResults';

const app = combineReducers({
  user,
  users,
  chatApp,
  chats,
  chatViews,
  messages,
  reservations,
  listeners,
  flightSearchResults,
});

export default app;

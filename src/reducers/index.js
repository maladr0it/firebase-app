import { combineReducers } from 'redux';
import chat from './chat';

const chatApp = combineReducers({
  chat
});

export default chatApp;
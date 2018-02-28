// this is for all listener behaviour
// let us first code a generic listener of resources
// this will require rewriting of API functions, too however

// for now, put all listeners in 1 place
// start with listening to inbox messages
import * as db from '../api';

import { chatsAdded } from './chatListActions';
import { messagesAdded } from './messageActions';
import { chatUsersUpdated, userDataUpdated } from './userActions';

const listenToUser = userId => (dispatch) => {
  const onUserData = (data) => {
    dispatch(userDataUpdated(userId, data));
  };
  // const userReservation
  db.listenToUser(userId, onUserData);
};

// listen to chat meta, and messages,
// IF chat is not already being listened to
const listenToChat = chatId => (dispatch) => {
  console.log(`listening to ${chatId} for messages`);
  const onMessage = (changes, messageIds) => {
    dispatch(messagesAdded(chatId, messageIds, changes));
  };
  const onUser = (changes, userIds) => {
    dispatch(chatUsersUpdated(chatId, userIds, changes));
    changes.forEach(user => dispatch(listenToUser(user.id)));
  };
  db.listenToChatForMessages(chatId, onMessage);
  db.listenToChatForUsers(chatId, onUser);
};


// listens for chats for an inbox
export const listenToInbox = (userId, feedName) => (dispatch) => {
  console.log('listening to inbox for chats');
  const callback = (changes, ids) => {
    dispatch(chatsAdded(changes, ids, feedName));
    changes.forEach(chat => dispatch(listenToChat(chat.id)));
  };
  db.listenToUserChats(userId, callback);
};

export const g = 5;

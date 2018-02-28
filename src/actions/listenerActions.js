// this is for all listener behaviour
// let us first code a generic listener of resources
// this will require rewriting of API functions, too however

// for now, put all listeners in 1 place
// start with listening to inbox messages
import * as db from '../api';

import { chatsAdded } from './chatListActions';
import { messagesAdded } from './messageActions';
import {
  chatUsersUpdated,
  userDataUpdated,
  reservationsUpdated,
  getAvatar,
} from './userActions';

const listenerOpened = (resourceType, resourceId) => ({
  type: 'LISTENER_OPENED',
  payload: { resourceType, resourceId },
});

// perform this at api level?
const separateChangesByType = changes => ({
  new: changes.filter(change => (change.type === 'added')),
  updated: changes.filter(change => (change.type === 'modified')),
  removed: changes.filter(change => (change.type === 'removed')),
});

const listenToUser = userId => (dispatch, getState) => {
  if (getState().listeners.users[userId]) {
    return;
  }
  const onUserData = (data) => {
    dispatch(userDataUpdated(userId, data));
    dispatch(getAvatar(userId, data));
    // TODO updates avatar even if it hasn't changed
  };
  const onReservation = (changes, reservationIds) => {
    dispatch(reservationsUpdated(userId, reservationIds, changes));
  };
  // const userReservation
  dispatch(listenerOpened('users', userId));
  db.listenToUser(userId, onUserData);
  db.listenForUserReservations(userId, onReservation);
};

// listen to chat meta, and messages,
// IF chat is not already being listened to
const listenToChat = chatId => (dispatch) => {
  console.log(`listening to ${chatId} for messages`);
  const onMessage = (changes, messageIds) => {
    const { new: newMessages } = separateChangesByType(changes);
    dispatch(messagesAdded(chatId, messageIds, newMessages));
  };
  const onUser = (changes, userIds) => {
    const { new: newUsers } = separateChangesByType(changes);
    dispatch(chatUsersUpdated(chatId, userIds, newUsers));
    changes.forEach(user => dispatch(listenToUser(user.id)));
  };
  db.listenToChatForMessages(chatId, onMessage);
  db.listenToChatForUsers(chatId, onUser);
};


// listens for chats for an inbox
export const listenToInbox = (userId, feedName) => (dispatch) => {
  console.log('listening to inbox for chats');
  const callback = (changes, ids) => {
    const { new: newChats } = separateChangesByType(changes);
    dispatch(chatsAdded(newChats, ids, feedName));
    newChats.forEach(chat => dispatch(listenToChat(chat.id)));
  };
  db.listenToUserChats(userId, callback);
};

export const g = 5;

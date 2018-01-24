import React from 'react';
import ChatList from './ChatList';
import ChatControls from './ChatControls';

import {
  listenForChatUpdates,
  listenForTaggedChats,
} from '../../actions';

import './index.css';

export default () => (
  <div className="ChatListPane">
    <ChatControls />
    <ChatList didMountFunc={() => console.log('chatList1')} />
    {/* <ChatList didMountFunc={() => console.log('chatList2')} /> */}
  </div>
);

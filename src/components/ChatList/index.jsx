import React from 'react';
import ChatList from './ChatList';
import ChatControls from './ChatControls';

import './index.css';

export default () => (
  <div className="ChatListPane">
    <ChatControls />
    <ChatList />
  </div>
);

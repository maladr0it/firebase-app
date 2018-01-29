import React from 'react';

import Inbox from './Inbox';
import FilteredList from './FilteredList';
import ChatControls from './ChatControls';

import './index.css';

const ChatListsPaneComponent = () => (
  <div className="ChatListsPane">
    <ChatControls />
    <Inbox feedName="inbox" />
    Filtered:
    <FilteredList feedName="hasAgent" tagName="hasAgent" />
  </div>
);
export default ChatListsPaneComponent;

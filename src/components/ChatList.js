import React from 'react';

const ChatList = (props) => {
  return (
    <div>
      SELECTED CHAT: {props.selectedChatId}
    </div>
  );
}

export default ChatList;
import React from 'react';

const ChatList = ({
  onSelectChat, onNewChat,
  chatIds, currentUserId
}) => {
  const chats = chatIds.map(chatId => (
    <li
      key={chatId}
      onClick={() => onSelectChat(chatId)}
    >
      CHAT: {chatId}
    </li>
  ));
  return (
    <div>
      <ul>{chats}</ul>
      <button onClick={() => onNewChat(currentUserId)}>ADD A CHAT</button>
    </div>
  );
};

export default ChatList;
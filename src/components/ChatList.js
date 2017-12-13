import React from 'react';

const ChatList = ({
  onSelectChat, onNewChat,
  chatIds, selectedChatId, currentUserId
}) => {
  const chats = chatIds.map(chatId => (
    <li
      key={chatId}
      onClick={() => onSelectChat(chatId)}
    >
      {(selectedChatId===chatId) ? '*' : ''}
      {chatId}
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
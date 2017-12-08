import React from 'react';

const ChatList = ({ onSelectChat, selectedChatId, chatIds }) => {
  const chats = chatIds.map((chatId, i) => (
    <li
      key={i}
      onClick={() => onSelectChat(chatId)}
    >
      CHAT: {chatId}
    </li>
  ));
  return (
    <div>
      <ul>{chats}</ul>
      <div>SELECTED CHAT: {selectedChatId}</div>
    </div>
  );
}

export default ChatList;
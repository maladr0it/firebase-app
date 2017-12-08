import React from 'react';

const ChatList = ({
  onSelectChat, onNewChat,
  selectedChatId, chatIds
}) => {
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
      <button onClick={() => onNewChat('NEW CHATTE')}>ADD A CHAT</button>
    </div>
  );
}

export default ChatList;
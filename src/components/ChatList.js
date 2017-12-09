import React from 'react';

const ChatList = ({
  onSelectChat, onNewChat,
  selectedChatId, chatIds,
  currentUserId // won't be necessary soon.
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
      <div>SELECTED CHAT: {selectedChatId}</div>
      <button onClick={() => onNewChat(currentUserId)}>ADD A CHAT</button>
    </div>
  );
}

export default ChatList;
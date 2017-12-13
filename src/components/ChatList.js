import React from 'react';

const ChatList = ({
  onSelectChat, onNewChat,
  chatIds, chats, selectedChatId, currentUserId
}) => {
  // change naming
  // this is hacky af, but if you get this working we can
  // refactor hard
  const chatList = chatIds.map((chatId, i) => (
    <li
      key={i}
      onClick={() => onSelectChat(currentUserId, chatId)}
    >
      {(chats[i].isUnread) ? 'NEW ' : 'READ ' }
      {chatId}
      {(selectedChatId === chatId) ? '*' : ''}
    </li>
  ));

  return (
    <div>
      <ul>{chatList}</ul>
      <button onClick={() => onNewChat(currentUserId)}>NEW CHAT</button>
    </div>
  );
};

export default ChatList;
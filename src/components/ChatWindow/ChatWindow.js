import React from 'react';
import { connect } from 'react-redux';

import MessageList from './MessageList';

// add form to add a user by ID
const ChatWindowComponent = ({ chatId }) => {
  return (
    <div style={{background: '#ADF7B6'}}>
      NAME: {chatId}
      <MessageList />
    </div>
  );
};

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChat
});

const ChatWindow = connect(
  mapStateToProps
)(ChatWindowComponent);

export default ChatWindow;



// const ChatWindow = ({ chatId, userIds, onAddUser }) => {
//   const users = userIds.map(id => <li key={id}>{id}</li>);
//   let input;
//   const addUserForm = (
//     <form
//       onSubmit={e => {
//         e.preventDefault();
//         onAddUser(chatId, input.value);
//         input.value = '';
//       }}
//     >
//       <input
//         defaultValue=''
//         ref={node => {
//           input = node;
//         }}
//       />
//       <button type='submit'>
//         ADD USER
//       </button>
//     </form>
//   );

//   return (
//     <div>
//       <div>CHATID: {chatId}</div>
//       {addUserForm}
//       <ul>{users}</ul>
//       <MessageListContainer />
//       <MessageInputContainer />
//     </div>
//   );
// };

// export default ChatWindow;
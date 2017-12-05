import React, { Component } from 'react';
import * as db from './api';

class App extends Component {
  state = {
    usernameField: undefined,
    messageField: undefined,
  };

  createUser = async (name) => {
    await db.createUser(name);
  };
  createChat = async () => {
    await db.createChat();
  };
  addChatToUser = async (userId, chatId) => {
    await db.addChatToUser(userId, chatId);
  };
  addUserToChat = async (chatId, userId) => {
    await db.addUserToChat(chatId, userId);
  };
  createMessage = async (chatId, userId, text) => {
    await db.createMessage(chatId, userId, text);
  };

  handleNewUserSubmit = (e) => {
    this.createUser(this.state.usernameField);
    e.preventDefault();
  };
  handleNewMessageSubmit = (e) => {
    this.createMessage(
      '6PVhc2zNVm7AVpK3yEEg', // chat1
      '7uRISV79dBVDudApbg4R', // user1
      this.state.messageField,
    );
    e.preventDefault();
  };

  // chat1 6PVhc2zNVm7AVpK3yEEg

  // user1 7uRISV79dBVDudApbg4R 'bob'
  // user2 GqNoXlU5C4v3u0R6ezm8 'locke'
  // user3 Q5ACMe5YEzzgCNFhqDsn 'sarah'
  // user4 zPkah9IETGi2iXqyKTDY 'sam'

  render() {
    return (
      <div>
        <form onSubmit={this.handleNewUserSubmit}>
          <label>username:
            <input onChange={e => this.setState({ usernameField: e.target.value })} />
          </label>
          <input type='submit' value='ADD' />
        </form>

        <button onClick={() => this.createChat()}>CREATE_CHAT</button>

        <button onClick={() => {
          this.addChatToUser();
        }}>ADD_CHAT_TO_USER</button>

        <button onClick={() => {
          this.addUserToChat();
        }}>ADD_USER_TO_CHAT</button>

        <form onSubmit={this.handleNewMessageSubmit}>
          <label>message:
            <input onChange={e => this.setState({ messageField: e.target.value })} />
          </label>
          <input type='submit' value='SEND' />
        </form>
      </div>
    );
  }
}
export default App;
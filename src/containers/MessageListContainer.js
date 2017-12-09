import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

// SELECTORS

// select message objs based on chat Id
const getMessages = (state, chatId) => {
  const chat = selectChat(state, chatId);
  const messages = selectMessages(state, chat.messageIds);
  return messages;
}
// helpers

// select chat obj based on chat Id
// TODO: this is a little hacky
const selectChat = (state, chatId) => {
  return state.chats[chatId] || { messageIds: [] };
}
// select message objs based on message Ids
const selectMessages = (state, messageIds) => {
  return messageIds.map(id => state.messages[id]);
};


const mapStateToProps = state => ({
  messages: getMessages(state, state.chatApp.selectedChatId)
});

const MessageListContainer = connect(
  mapStateToProps
)(MessageList);

export default MessageListContainer;
import { connect } from 'react-redux';
import {
  addChatParticipant
} from '../actions'
import ChatWindow from '../components/ChatWindow';

// SELECTORS

// this will eventually select more user info
// select userIds based on chatId
const getUserIds = (state, chatId) => {
  const chat =  selectChat(state, chatId);
  return chat.userIds;
};

const selectChat = (state, chatId) => {
  return state.chats[chatId] || { userIds: [] }
}

const mapStateToProps = state => ({
  chatId: state.chatApp.selectedChatId,
  userIds: getUserIds(state, state.chatApp.selectedChatId)
});

const mapDispatchToProps = dispatch => ({
  onAddUser: (chatId, userId) => {
    dispatch(addChatParticipant(chatId, userId))
  }
});

const ChatWindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindow);

export default ChatWindowContainer;

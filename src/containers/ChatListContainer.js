// reconsider naming

import { connect } from 'react-redux';
import ChatList from '../components/ChatList';

const mapStateToProps = state => ({
  selectedChatId: state.view.selectedChatId
});

const ChatListContainer = connect(
  mapStateToProps
)(ChatList);

export default ChatListContainer;
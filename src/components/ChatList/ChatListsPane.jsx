import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import Chip from 'material-ui/Chip';
import {
  filterAdded,
} from '../../actions';
import Inbox from './Inbox';
import FilteredList from './FilteredList';
import ChatControls from './ChatControls';

import InputForm from '../InputForm';
import './index.css';

const ChatListsPaneComponent = ({
  filters, onAddFilter,
}) => {
  const filteredLists = filters.map(filter => (
    <FilteredList
      key={filter}
      feedName={filter}
      tagName={filter}
    />
  ));
  const addForm = (
    <IconMenu
      iconButtonElement={<Chip>+</Chip>}
      anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
    >
      <InputForm
        label="ADD TAG: "
        handleSubmit={tagName => onAddFilter(tagName)}
        autoFocus
      />
    </IconMenu>
  );
  return (
    <div className="ChatListsPane">
      <ChatControls />
      <Inbox feedName="inbox" />
      {filteredLists}
      {addForm}
    </div>
  );
};
const mapStateToProps = state => ({
  filters: state.chatApp.filters,
});
const mapDispatchToProps = ({
  onAddFilter: filterAdded,
});
const ChatListsPane = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListsPaneComponent);
export default ChatListsPane;

ChatListsPaneComponent.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddFilter: PropTypes.func.isRequired,
};

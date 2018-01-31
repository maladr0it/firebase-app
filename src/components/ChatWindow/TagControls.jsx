import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import Chip from 'material-ui/Chip';

import {
  tagChat,
  untagChat,
} from '../../actions';
import { getTags } from '../../reducers/chats';

import InputForm from '../InputForm';

const TagControlsComponent = ({
  chatId, tags, onTagChat, onUntagChat,
}) => {
  const tagChips = tags.map(tag => (
    <Chip
      key={tag}
      onRequestDelete={() => onUntagChat(chatId, tag)}
    >
      {tag}
    </Chip>
  ));
  const addForm = (
    <IconMenu
      iconButtonElement={<Chip>+</Chip>}
      anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
    >
      <InputForm
        label="ADD TAG: "
        handleSubmit={tagName => onTagChat(chatId, tagName)}
        autoFocus
      />
    </IconMenu>
  );
  return (
    // TODO: if not nested, there are css issues.  investigate
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tagChips}
        {addForm}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  tags: getTags(state.chats, ownProps.chatId),
});
const mapDispatchToProps = ({
  onTagChat: tagChat,
  onUntagChat: untagChat,
});
const TagControls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagControlsComponent);
export default TagControls;

TagControlsComponent.propTypes = {
  chatId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagChat: PropTypes.func.isRequired,
  onUntagChat: PropTypes.func.isRequired,
};

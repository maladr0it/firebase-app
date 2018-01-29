import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  tagChat,
  untagChat,
} from '../../actions';
import { getTags } from '../../reducers/chats';

import InputForm from '../InputForm';

const TagControlsComponent = ({
  chatId, tags, onTagChat, onUntagChat,
}) => {
  const tagButtons = tags.map(tag => (
    <button
      key={tag}
      onClick={() => onUntagChat(chatId, tag)}
    >
      {tag}
    </button>
  ));
  return (
    <div>
      <InputForm
        label="add tag: "
        handleSubmit={tagName => onTagChat(chatId, tagName)}
      />
      TAGS: {tagButtons}
      {/* TAGS: {tags.map(tag => `${tag} `)} */}
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

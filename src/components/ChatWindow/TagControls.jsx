import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  tagChat,
} from '../../actions';
import { getChat } from '../../reducers/chats';

import InputForm from '../InputForm';

const TagControlsComponent = ({
  chatId, tags, onTagChat,
}) => (
  <div>
    TAGS: {tags.map(tag => <span>{tag} </span>)}
    <InputForm
      label="add tag: "
      handleSubmit={tagName => onTagChat(chatId, tagName)}
    />
  </div>
);
const mapStateToProps = (state, ownProps) => ({
  tags: Object.keys(getChat(state.chats, ownProps.chatId).tags),
});
const mapDispatchToProps = ({
  onTagChat: tagChat,
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
};

/* <InputForm
  label="add tag: "
  handleSubmit={tagName => onTagChat(chatId, tagName)}
/> */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postID, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <h4>Leave a Comment</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postID, { text });
          // Reset state
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='10'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <br />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

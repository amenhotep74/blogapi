import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postID,
  comment: { _id, text, name, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className='comment-section'>
      <div className='border mb-3'>
        <span className='text-muted'>
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </span>
        <p className='text-muted'>From: {name}</p>
        <p>{text}</p>
        {auth.user.isAdmin && (
          <button
            className='btn btn-danger'
            onClick={(e) => deleteComment(postID, _id)}
          >
            Delete Comment
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postID: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);

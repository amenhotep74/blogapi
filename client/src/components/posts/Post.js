import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match, auth }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <h1>Loading...</h1>
  ) : (
    <Fragment>
      <PostItem post={post} />

      {/* Comments form here later */}
      <CommentForm postID={post._id} />
      {/* Loop through to display comments under post */}
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postID={post._id} />
      ))}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost, deleteComment })(Post);

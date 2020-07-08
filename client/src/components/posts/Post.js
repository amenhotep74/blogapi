import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import Moment from 'react-moment';

const Post = ({ getPost, post: { post, loading }, match }) => {
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
      <div className='comment-section'>
        {post.comments.map((comment) => (
          <div className='border mb-3'>
            <span className='text-muted'>
              <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
            </span>
            <p className='text-muted'>From: {comment.name}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);

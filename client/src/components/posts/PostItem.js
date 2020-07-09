import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deletePost } from '../../actions/post';
import auth from '../../reducers/auth';
import { post } from 'request';
import EditForm from './EditForm';

const PostItem = ({
  deletePost,
  auth,
  post: { _id, text, name, comments, date },
}) => {
  return (
    <Fragment>
      <div className='border p-1 m-3'>
        <span class='text-muted'>Author Name: {name} / / Date Posted: </span>
        <Moment format='YYYY/MM/DD'>{date}</Moment> / AuthorID: {name}
        <p>{text}</p>
        <Link to={`/${_id}`} className='btn btn-success mr-1'>
          Read More
        </Link>
        {auth.user && auth.user.isAdmin && (
          <Fragment>
            <Link
              post={post}
              to={`/editpost/${_id}`}
              className='btn btn-primary mr-1'
            >
              Edit Post
            </Link>
            <button
              onClick={(e) => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              Delete Post
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostItem);

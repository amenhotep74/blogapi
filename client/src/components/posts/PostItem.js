import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deletePost } from '../../actions/post';
import auth from '../../reducers/auth';

const PostItem = ({
  deletePost,
  auth,
  post: { _id, text, name, comments, date },
}) => {
  return (
    <Fragment>
      <div className='border p-1 m-3'>
        <span class='text-muted'>Author Name: {name} / / Date Posted: </span>
        <Moment format='YYYY/MM/DD'>{date}</Moment> / AuthorID: {auth.user.name}
        <p>{text}</p>
        <button className='btn btn-success mr-1'>Read More</button>
        {auth.user.isAdmin && (
          <Fragment>
            <button className='btn btn-primary mr-1'>Edit</button>
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

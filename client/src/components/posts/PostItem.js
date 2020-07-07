import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const PostItem = ({
  auth,
  post: { _id, text, name, user, comments, date },
}) => {
  return (
    <div className='border p-1 m-3'>
      <span class='text-muted'>
        Author Name: {name} / / Date Posted:{' '}
        <Moment format='YYYY/MM/DD'>{date}</Moment> / AuthorID: {user}
      </span>
      <p>{text}</p>
      <button className='btn btn-success mr-1'>Read More</button>
      <button className='btn btn-primary mr-1'>Edit</button>
      <button className='btn btn-danger'>Delete Post</button>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);

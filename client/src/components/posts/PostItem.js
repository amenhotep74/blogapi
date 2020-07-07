import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostItem = ({
  auth,
  post: { _id, text, name, user, comments, date },
}) => {
  return (
    <div className='border p-1 m-3'>
      <span class='text-muted'>
        Author Name: {name} / / Date Posted: {date} / AuthorID: {user}
      </span>
      <p>{text}</p>
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

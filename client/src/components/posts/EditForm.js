import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const EditForm = ({
  getPost,
  deleteComment,
  post: { post, loading },
  match,
  auth,
}) => {
  // Get post using params id from URL to get post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <h1>loading...</h1>
  ) : (
    <Fragment>
      <div>
        <h1>Edit Post</h1>
        <p>{post._id}</p>
        <p>{post.text}</p>
        <textarea name='' cols='30' rows='10'></textarea>
        <br />
        <input type='submit' class='btn btn-primary' />
      </div>
    </Fragment>
  );
};

EditForm.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  getPost: PropTypes.func.isRequired,
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(EditForm);

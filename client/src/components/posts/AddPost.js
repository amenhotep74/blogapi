import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Home from '../layout/Home';

const AddPost = ({
  addPost,
  auth: { isAuthenticated, loading, user },
  history,
}) => {
  const [text, setText] = useState('');

  // Redirect back to home if user is not an admin
  if (user && user.isAdmin == false) {
    return <Redirect to={Home} />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // Dont let user submit anything if not admin
    if (user && user.isAdmin == false) {
      return <Redirect to={Home} />;
    } else {
      // form data
      addPost({ text }, history);
      setText('');
    }
  };

  return (
    <div class='post-form'>
      <h3>Add Post</h3>
      <form class='form my-1' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { addPost })(withRouter(AddPost));

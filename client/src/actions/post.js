import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, ADD_POST } from './types';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add posts
export const addPost = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      // Receive post from backend
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
    // Redirect to home
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
    });
  }
};

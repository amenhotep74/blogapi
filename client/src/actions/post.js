import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_POST,
} from './types';

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
    // Redirect to home
    // Display Post Created alert
    dispatch(setAlert('Post Created', 'success'));
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

// Remove Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(getPosts());
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: null,
    });
  }
};

// Get individual post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment
export const addComment = (postID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/posts/comment/${postID}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    // Get Post Again
    const newres = await axios.get(`/posts/${postID}`);

    dispatch({
      type: GET_POST,
      payload: newres.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteComment = (postID, _id) => async (dispatch) => {
  try {
    console.log('action called');
    const res = await axios.delete(`/posts/comment/${postID}/${_id}`);

    dispatch({
      type: REMOVE_COMMENT,
      // Return comments array from backend
      payload: res.data,
    });

    const newres = await axios.get(`/posts/${postID}`);
    dispatch({
      type: GET_POST,
      payload: newres.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// edit post
export const editPost = (formData, _id, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/posts/${_id}`, formData, config);

    console.log('formdata', formData);

    dispatch({
      type: EDIT_POST,
      payload: res.data,
    });

    // Get Post Again
    const newres = await axios.get(`/posts/${_id}`);
    dispatch({
      type: GET_POST,
      payload: newres.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

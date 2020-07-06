import { setAlert } from './alert';
import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from './types.js';

import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/auth');

    dispatch({
      type: USER_LOADED,
      // Receives user from the backend and updates the state
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      // Set token to the payload
      payload: res.data,
    });
    // login with auth route from backend to get user info
    dispatch(loadUser());
  } catch (err) {
    // Get array of errors from the backend
    const errors = err.response.data.errors;
    // For each error dispatch an action
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      // set token to the payload
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // Get array of errors from the backend
    const errors = err.response.data.errors;
    // for each error dispatch an action
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// Bring in redux action
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

const Login = ({ setAlert, login, isAuthenticated }) => {
  // initial state variable, function used to update store
  const [formData, setFormData] = useState({
    // initial state
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect back to home if logged in
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <label for='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            required
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            class='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);

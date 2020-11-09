import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Bring in redux action
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";

const Login = ({ setAlert, login, isAuthenticated }) => {
  // initial state variable, function used to update store
  const [formData, setFormData] = useState({
    // initial state
    email: "",
    password: "",
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
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div class="container form-container mt-5">
        <div class="card">
          <article class="card-body">
            <h4 class="card-title text-center mb-4 mt-1">Login</h4>
            <hr />
            <form onSubmit={(e) => onSubmit(e)}>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      {" "}
                      <i class="fa fa-at"></i>{" "}
                    </span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      {" "}
                      <i class="fa fa-lock"></i>{" "}
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">
                  {" "}
                  Login{" "}
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </Fragment>
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

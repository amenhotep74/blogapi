import React, { Fragment } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <Fragment>
      <li className="nav-item mr-2 ml-1 logout">
        Welcome, {user && user.name}
      </li>
      <li className="nav-item">
        <a onClick={logout} href="">
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const adminLinks = (
    <Fragment>
      <li className="nav-item pr-1 pl-1">
        <Link to="/createpost">Add New Post</Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item pr-1 pl-1">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item pr-1 pl-1">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <h1>
          <Link class="navbar-brand" to="/">
            BlogAPI
          </Link>
        </h1>
        {!loading && (
          <ul className="navbar-nav mr-auto" id="navbarSupportedContent">
            {/* if user is logged in display admin links */}
            {user && user.isAdmin ? adminLinks : null}

            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import auth from '../../reducers/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>Welcome {user && user.name}</li>
      <li>
        <a onClick={logout} href=''>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to='/createpost'>Add New Post</Link>
      </li>
      <li>You have admin status</li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className='navbar bg-warning'>
        <h1>
          <Link to='/'>BlogAPI</Link>
        </h1>
        {!loading && (
          <Fragment>
            {/* if user is logged in display admin links */}
            {user && user.isAdmin ? adminLinks : null}

            {isAuthenticated ? authLinks : guestLinks}
          </Fragment>
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

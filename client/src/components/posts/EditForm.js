import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { withRouter, Redirect } from "react-router-dom";
import Home from "../layout/Home";
import { editPost } from "../../actions/post";
import Loading from "../../utils/Loader";

const EditForm = ({
  getPost,
  post: { post, loading },
  match,
  auth: { user },
  history,
  editPost,
}) => {
  // Get post using params id from URL to get post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Dont let user submit anything if not admin
    if (user && user.isAdmin == false) {
      return <Redirect to={Home} />;
    } else {
      // form data
      editPost({ text }, match.params.id, history);
      setText("");
    }
  };

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <div>
        <h1>Edit Post</h1>
        <p>{post.text}</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <textarea
            name="text"
            cols="50"
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <br />
          <input type="submit" class="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  );
};

EditForm.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  post: state.post,
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, editPost })(
  withRouter(EditForm)
);

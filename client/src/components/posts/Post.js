import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { deleteComment } from "../../actions/post";
import Loading from "../../utils/Loader";
import auth from "../../reducers/auth";

const Post = ({ getPost, auth, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <PostItem post={post} />

      {/* Comments form here, only show to logged in users */}
      {auth && auth.user && <CommentForm postID={post._id} />}

      <strong>
        <p>Comments:</p>
      </strong>
      {/* Loop through to display comments under post */}
      {post &&
        post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postID={post._id} />
        ))}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, deleteComment })(Post);

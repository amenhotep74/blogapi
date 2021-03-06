import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { connect } from "react-redux";
import Loading from "../../utils/Loader";

const Home = ({ getPosts, post: { posts, loading } }) => {
  // Fetch posts when component loads
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // If loading return loading else return postslist
  return loading ? (
    <Loading />
  ) : (
    <div class="posts container">
      {posts.map((post) => (
        // pass posts down as props into postItem
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Home);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { connect } from 'react-redux';

const Home = ({ getPosts, post: { posts, loading } }) => {
  // fetch posts when component loads
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // if loading return loading else return postslist
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div class='posts container'>
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

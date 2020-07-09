import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  EDIT_POST,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        // insert post to top of array
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        // return all posts except the one that was in the payload, which is the one that was delete.
        posts: state.posts.filter((post) => POST_ERROR.id !== payload),
        loading: false,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    default:
      return state;
  }
}

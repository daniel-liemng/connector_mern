import { GET_POSTS, POSTS_ERROR, UPDATE_LIKES } from "../actionTypes";

const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, loading: false, posts: payload };
    case POSTS_ERROR:
      return { ...state, loading: false, error: payload };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    default:
      return state;
  }
};

export default postReducer;

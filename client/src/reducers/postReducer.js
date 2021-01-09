import { GET_POSTS, POSTS_ERROR } from "../actionTypes";

const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, loading: false, posts: payload };
    case POSTS_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default postReducer;

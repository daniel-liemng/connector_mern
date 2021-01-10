import {
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";

const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, loading: false, posts: payload };
    case GET_POST:
      return { ...state, loading: false, post: payload };
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
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comm) => comm._id !== payload),
        },
      };
    case SET_ALERT:
      return { ...state, error: { msg: payload.msg, type: payload.type } };
    case REMOVE_ALERT:
      return { ...state, error: {} };
    default:
      return state;
  }
};

export default postReducer;

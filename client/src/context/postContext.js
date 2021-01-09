import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/postReducer";
import { GET_POSTS, POSTS_ERROR } from "../actionTypes";

const PostContext = createContext();

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get all posts
  const getPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts");

      dispatch({ type: GET_POSTS, payload: data });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  return (
    <PostContext.Provider value={{ ...state, getPosts }}>
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };

import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/postReducer";
import {
  DELETE_POST,
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";
import { set } from "mongoose";

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

  // Add like
  const addLike = async (postId) => {
    try {
      const { data } = await axios.put(`/api/posts/like/${postId}`);

      dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: data } });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: POSTS_ERROR,
        payload: {
          msg:
            err.response && err.response.data.errors
              ? err.response.data.errors[0].msg
              : err.response,
          status: err.response.status,
          type: "error",
        },
      });
    }
  };

  // Remove like
  const removeLike = async (postId) => {
    try {
      const { data } = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: data } });
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data.errors[0].msg);
      dispatch({
        type: POSTS_ERROR,
        payload: {
          msg:
            err.response && err.response.data.errors
              ? err.response.data.errors[0].msg
              : err.response,
          status: err.response.status,
          type: "error",
        },
      });
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const { data } = await axios.delete(`/api/posts/${postId}`);

      dispatch({ type: DELETE_POST, payload: postId });

      alert("Post Removed");
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data.errors[0].msg);

      dispatch({
        type: POSTS_ERROR,
        payload: {
          msg:
            err.response && err.response.data.errors
              ? err.response.data.errors[0].msg
              : err.response,
          status: err.response.status,
          type: "error",
        },
      });
    }
  };

  //// Alert
  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });
  };

  const removeAlert = () => {
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <PostContext.Provider
      value={{
        ...state,
        getPosts,
        addLike,
        removeLike,
        deletePost,
        setAlert,
        removeAlert,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };

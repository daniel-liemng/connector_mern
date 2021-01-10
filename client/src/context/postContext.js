import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/postReducer";
import {
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";

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

      dispatch({
        type: SET_ALERT,
        payload: { msg: "You like this post", type: "success" },
      });
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

      dispatch({
        type: SET_ALERT,
        payload: { msg: "You unlike this post", type: "success" },
      });
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
      await axios.delete(`/api/posts/${postId}`);

      dispatch({ type: DELETE_POST, payload: postId });

      dispatch({
        type: SET_ALERT,
        payload: { msg: "Post Removed", type: "error" },
      });
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

  // Add post
  const addPost = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/posts`, formData, config);

      dispatch({ type: ADD_POST, payload: data });

      dispatch({
        type: SET_ALERT,
        payload: { msg: "Post Created", type: "success" },
      });
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
        addPost,
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

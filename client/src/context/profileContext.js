import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/profileReducer";

import {
  PROFILE_GET,
  PROFILES_GET,
  PROFILE_UPDATE,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  GET_REPOS,
  ACCOUNT_DELETED,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";

const ProfileContext = createContext();

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  errors: [],
};

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //// Get current users profile
  const getCurrentProfile = async () => {
    try {
      const { data } = await axios.get("/api/profile/me");

      dispatch({ type: PROFILE_GET, payload: data });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Get all profiles
  const getProfiles = async () => {
    // Clear the current profile
    dispatch({ type: PROFILE_CLEAR });

    try {
      const { data } = await axios.get("/api/profile");

      dispatch({ type: PROFILES_GET, payload: data });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Get profile by ID
  const getProfileById = async (userId) => {
    try {
      const { data } = await axios.get(`/api/profile/user/${userId}`);

      dispatch({ type: PROFILE_GET, payload: data });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Get profile by ID
  const getGithubRepos = async (username) => {
    try {
      const { data } = await axios.get(`/api/profile/github/${username}`);

      dispatch({ type: GET_REPOS, payload: data });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Create or update profile
  const createProfile = async (formData, history, edit = false) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/profile", formData, config);

      dispatch({ type: PROFILE_GET, payload: data });

      if (edit) {
        dispatch({
          type: SET_ALERT,
          payload: { msg: "Profile Updated", type: "success" },
        });
      } else {
        dispatch({
          type: SET_ALERT,
          payload: { msg: "Profile Created", type: "success" },
        });
      }

      // Redirect if creating, stay if updating
      if (!edit) {
        setTimeout(() => {
          history.push("/dashboard");
        }, 3000);
      }
    } catch (err) {
      // Show error validation from backend
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch({ type: SET_ALERT, payload: error });
        });
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Add Experience
  const addExperience = async (formData, history) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/profile/experience",
        formData,
        config
      );

      dispatch({ type: PROFILE_UPDATE, payload: data });

      dispatch({
        type: SET_ALERT,
        payload: { msg: "Experience Added", type: "success" },
      });

      // Redirect
      setTimeout(() => {
        history.push("/dashboard");
      }, 6000);
    } catch (err) {
      // Show error validation from backend
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch({ type: SET_ALERT, payload: error });
        });
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Add Education
  const addEducation = async (formData, history) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/profile/education",
        formData,
        config
      );

      dispatch({ type: PROFILE_UPDATE, payload: data });

      dispatch({
        type: SET_ALERT,
        payload: { msg: "Education Added", type: "success" },
      });

      // Redirect
      setTimeout(() => {
        history.push("/dashboard");
      }, 4000);
    } catch (err) {
      // Show error validation from backend
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch({ type: SET_ALERT, payload: error });
        });
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Delete Experience
  const deleteExperience = async (expId) => {
    try {
      const { data } = await axios.delete(`/api/profile/experience/${expId}`);

      dispatch({ type: PROFILE_UPDATE, payload: data });

      dispatch({
        type: SET_ALERT,
        payload: { msg: "Experience Removed", type: "success" },
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Delete Education
  const deleteEducation = async (eduId) => {
    try {
      const { data } = await axios.delete(`/api/profile/education/${eduId}`);

      dispatch({ type: PROFILE_UPDATE, payload: data });

      dispatch({
        type: SET_ALERT,
        payload: { msg: "Education Removed", type: "success" },
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //// Delete Account and Profile
  const deleteAccount = async (history) => {
    if (window.confirm("Are you sure? This can not be undone")) {
      try {
        await axios.delete("/api/profile");

        dispatch({ type: PROFILE_CLEAR });

        dispatch({ type: ACCOUNT_DELETED });

        dispatch({
          type: SET_ALERT,
          payload: {
            msg: "Your account has been permanently deleted",
            type: "error",
          },
        });

        // Redirect
        setTimeout(() => {
          history.push("/dashboard");
        }, 5000);
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };

  const removeAlert = () => {
    console.log("removed");
    dispatch({ type: REMOVE_ALERT });
  };

  const clearProfile = () => {
    dispatch({ type: PROFILE_CLEAR });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getCurrentProfile,
        createProfile,
        removeAlert,
        clearProfile,
        addExperience,
        addEducation,
        deleteExperience,
        deleteEducation,
        deleteAccount,
        getProfiles,
        getProfileById,
        getGithubRepos,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfileContext };

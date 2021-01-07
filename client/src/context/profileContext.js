import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import reducer from "../reducers/profileReducer";

import {
  PROFILE_GET,
  PROFILE_UPDATE,
  PROFILE_ERROR,
  PROFILE_CLEAR,
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

      console.log("data", data);
      dispatch({ type: PROFILE_GET, payload: data });
    } catch (err) {
      console.log("err", err);
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
      console.log(err.response.data);
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
      }, 2000);
    } catch (err) {
      console.log(err.response.data);
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
      }, 2000);
    } catch (err) {
      console.log(err.response.data);
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

  const removeAlert = () => {
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

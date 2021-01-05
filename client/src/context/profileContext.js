import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import reducer from "../reducers/profileReducer";
import { PROFILE_GET, PROFILE_ERROR } from "../actionTypes";

const ProfileContext = createContext();

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
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

  return (
    <ProfileContext.Provider value={{ ...state, getCurrentProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfileContext };

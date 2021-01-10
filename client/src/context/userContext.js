import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/userReducer";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  SET_ALERT,
  REMOVE_ALERT,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../actionTypes";
import setAuthToken from "../utils/setAuthToken";

const UserContext = createContext();

const getTokenFromLocalStorage = () =>
  localStorage.getItem("connector_token")
    ? JSON.parse(localStorage.getItem("connector_token"))
    : null;

const initialState = {
  token: getTokenFromLocalStorage(),
  isAuthenticated: null,
  user: null,
  user_loading: true,
  user_login_loading: false,
  user_login_error: null,
  user_register_loading: false,
  user_register_error: null,
  errors: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //// Load userInfo every single time the main component loads
  const loadUser = async () => {
    const token = JSON.parse(localStorage.getItem("connector_token"));

    // Set Authorization Headers for axios
    if (token) {
      setAuthToken(token);
    }

    try {
      const { data } = await axios.get("/api/auth");

      dispatch({ type: USER_LOADED, payload: data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //// Register
  const registerUser = async (name, email, password) => {
    // loading
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      // Load User
      loadUser();
    } catch (err) {
      // Show error validation from backend
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch({ type: SET_ALERT, payload: error });
        });
      }

      dispatch({
        type: USER_REGISTER_ERROR,
        payload:
          err.response && err.response.data.errors
            ? err.response.data.errors
            : err.response,
      });
    }
  };

  //// Login
  const loginUser = async (email, password) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth",
        { email, password },
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      // Load User
      loadUser();
    } catch (err) {
      // Show error validation from backend
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch({ type: SET_ALERT, payload: error });
        });
      }

      dispatch({
        type: USER_LOGIN_ERROR,
        payload:
          err.response && err.response.data.errors
            ? err.response.data.errors
            : err.response,
      });
    }
  };

  //// Logout
  const logout = () => {
    // dispatch({ type: PROFILE_CLEAR });

    dispatch({ type: LOGOUT });

    // Temporarily reload the page -> fix later
    // Prob: log out: 1st: just remove localStorage, token(state) is null, user & isAuth still there
    // Prob: log out: 2st: delete all. Truely logout
    window.location.reload(true);
  };

  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });
  };

  const removeAlert = () => {
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        setAlert,
        removeAlert,
        loadUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };

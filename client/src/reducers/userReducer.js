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

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, user_login_loading: true };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("connector_token", JSON.stringify(payload.token));
      return {
        ...state,
        user_login_loading: false,
        isAuthenticated: true,
        token: payload.token,
      };
    case USER_LOGIN_ERROR:
      localStorage.removeItem("connector_token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        user_register_loading: false,
        user_register_error: payload,
      };
    case USER_REGISTER_REQUEST:
      return { ...state, user_register_loading: true };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem("connector_token", JSON.stringify(payload.token));
      return {
        ...state,
        user_register_loading: false,
        isAuthenticated: true,
        token: payload.token,
      };
    case USER_REGISTER_ERROR:
      localStorage.removeItem("connector_token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        user_register_loading: false,
        user_register_error: payload,
      };
    case SET_ALERT:
      console.log("payload", payload);
      return { ...state, errors: [...state.errors, payload] };
    case REMOVE_ALERT:
      return { ...state, errors: [] };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user_loading: false,
        user: payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem("connector_token");
      return {
        ...state,
        user_loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT:
      localStorage.removeItem("connector_token");
      return {
        ...state,
        user_loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;

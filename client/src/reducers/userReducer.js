import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, user_login_loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, user_login_loading: false, user: payload };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        user_login_loading: false,
        user_login_error: payload,
      };
    case USER_REGISTER_REQUEST:
      return { ...state, user_register_loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, user_register_loading: false, user: payload };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        user_register_loading: false,
        user_register_error: payload,
      };
    case SET_ALERT:
      console.log("payload", payload);
      return { ...state, errors: [...state.errors, payload] };
    case REMOVE_ALERT:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default userReducer;

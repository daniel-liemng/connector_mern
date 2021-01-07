import {
  PROFILE_GET,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";

const profileReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_GET:
      return { ...state, loading: false, profile: payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    case PROFILE_CLEAR:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: [],
        error: null,
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

export default profileReducer;

import {
  PROFILE_GET,
  PROFILES_GET,
  PROFILE_UPDATE,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  GET_REPOS,
  SET_ALERT,
  REMOVE_ALERT,
  ACCOUNT_DELETED,
} from "../actionTypes";

const profileReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_GET:
    case PROFILE_UPDATE:
      return { ...state, loading: false, profile: payload };
    case PROFILES_GET:
      return { ...state, loading: false, profiles: payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload, profile: null };
    case PROFILE_CLEAR:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: [],
        error: null,
        errors: [],
      };
    case ACCOUNT_DELETED:
      localStorage.removeItem("connector_token");
      return { ...state };
    case GET_REPOS:
      return { ...state, loading: false, repos: payload };
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

import { PROFILE_GET, PROFILE_ERROR } from "../actionTypes";

const profileReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_GET:
      return { ...state, loading: false, profile: payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default profileReducer;

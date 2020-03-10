import {
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_GITHUB
} from "../actions/types";
const intialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: []
};

function profile(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_GITHUB:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        error: payload,
        repos: [],
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
export default profile;

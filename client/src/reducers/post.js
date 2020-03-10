import { GET_POST, POST_ERROR, GET_POSTS, DELETE_POST } from "../actions/types";
const intialState = {
  post: null,
  posts: [],
  errors: {},
  loading: true
};

export default function(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        post: null
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };

    default:
      return state;
  }
}

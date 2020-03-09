import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
const rootUser = combineReducers({
  alert,
  auth,
  profile,
  post
});

export default rootUser;

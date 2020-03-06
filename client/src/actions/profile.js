import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//get profile
export const getCurrentProfile = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE,
    payload: []
  });
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//get profile by id
export const getProfileById = id => async dispatch => {
  console.log("in getprofilebyid");
  dispatch({
    type: CLEAR_PROFILE,
    payload: []
  });
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    console.log("in getprofile try block", res.data);
  } catch (err) {
    console.log("in getprofile catch block", err);
    console.log("========", err.response.statusText);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//get all profiles

export const getAllProfiles = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE,
    payload: []
  });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Create Profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/profile/me", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Profile updated" : "Profile created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    // console.log(err.response.data);
    const errors = [...err.response.data.error];
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//add/update education
export const addEducation = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Profile Updated", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = [...err.response.data.errors];
    // console.log(err.response.data);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//add/update experience
export const addExperience = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Profile Updated", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = [...err.response.data.errors];
    // console.log(err.response.data);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Experience deleted", "SUCCESS"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Education deleted", "SUCCESS"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Delete account
export const deleteAccount = () => async dispatch => {
  if (
    window.confirm(
      "Are you sure you want to delete the account? This action can not be undone."
    )
  ) {
    try {
      const res = await axios.delete(`/api/profiles`);
      dispatch({
        type: CLEAR_PROFILE,
        payload: res.data
      });
      dispatch({
        type: ACCOUNT_DELETED,
        payload: res.data
      });
      dispatch(setAlert("Account deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};

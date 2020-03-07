import { GET_POST, POST_ERROR, GET_POSTS, DELETE_POST } from "../actions/types";
import axios from "axios";

//get post by id
export const getPostbyId = id => async dispatch => {
  // console.log("in get post by id, the id is :", id);
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//delete post by id
export const deletePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: res.data
    });
    dispatch(getPost());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//get all posts
export const getPost = () => async dispatch => {
  try {
    const res = await axios.get(`/api/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//Create a post
export const addPost = text => async dispatch => {
  try {
    console.log("in add post with text ", text);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/posts", { text: text }, config);
    dispatch(getPost());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//like a post
export const like = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch(getPost());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//like a post
export const unlike = id => async dispatch => {
  // console.log("unliked");
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch(getPost());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};
//Create Comment
export const addComment = (post_id, text) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(
      `/api/posts/comment/${post_id}`,
      { text },
      config
    );
    // console.log("in create comment");
    dispatch(getPostbyId(post_id));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

//Delete Comment
export const removeComment = (post_id, comment_id) => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/posts/comment/${post_id}/${comment_id}`
    );
    // console.log("in create comment");
    dispatch(getPostbyId(post_id));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import PropTypes from "prop-types";
function CreatePost({ addPost }) {
  const [text, settext] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    addPost(text);
    settext("");
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={text}
            onChange={e => settext(e.target.value)}
          ></textarea>
          <input
            type="submit"
            onClick={onSubmit}
            className="btn btn-dark my-1"
            value="Submit"
          />
        </form>
      </div>
    </Fragment>
  );
}
CreatePost.proptype = {
  addPost: PropTypes.func.isRequired
};
// const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addPost: addPost
};

export default connect(null, mapDispatchToProps)(CreatePost);

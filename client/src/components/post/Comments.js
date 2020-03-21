import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeComment } from "../../actions/post";
// import Loading from "../layout/loading"

function Comments({ removeComment, post: { comments, _id }, auth: { user } }) {
  console.log("in comments component comments are ", comments);
  return (
    <div className="comments">
      {comments !== [] &&
        comments.map(comment => (
          <div className="post bg-white p-1 my-1">
            <div>
              <Link href={`/profile/${comment.user}`}>
                <img className="round-img" src={comment.avatar} alt="" />
                <h4>John Doe</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{comment.text} </p>
              <p className="post-date">
                <Moment form at="YYYY/MM/DD">
                  {comment.date}
                </Moment>
              </p>
            </div>
            <Fragment>
              {user._id === comment.user && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeComment(_id, comment._id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </Fragment>
          </div>
        ))}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post.post,
  auth: state.auth
});

const mapDispatchToProps = {
  removeComment: removeComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

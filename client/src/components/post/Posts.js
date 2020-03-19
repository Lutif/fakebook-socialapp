import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getPost, deletePost, like, unlike } from "../../actions/post";
import { connect } from "react-redux";
import Loading from "../layout/loading";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
function Posts({
  getPost,
  deletePost,
  unlike,
  like,
  post: { posts, loading },
  auth
}) {
  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <CreatePost />

          {posts != null &&
            posts.map(post => (
              <div className="posts">
                <div className="post bg-white p-1 my-1">
                  <div>
                    <a href={`/profile/${post.user}`}>
                      <img className="round-img" src={post.avatar} alt="" />
                      <h4>{post.name}</h4>
                    </a>
                  </div>
                  <div>
                    <p className="my-1">{post.text}</p>
                    <p className="post-date">{`Posted on ${post.date}`}</p>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => like(post._id)}
                    >
                      <i className="fas fa-thumbs-up"></i>
                      <span>{post.likes.length > 0 && post.likes.length}</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => unlike(post._id)}
                    >
                      <i className="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-primary">
                      Discussion{" "}
                      {post.comments.length > 0 && (
                        <span className="comment-count">
                          {post.comments.length}
                        </span>
                      )}
                    </Link>
                    {auth.user._id === post.user && (
                      <button
                        type="button"
                        onClick={() => deletePost(post._id)}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </Fragment>
      )}
    </Fragment>
  );
}

Posts.propTypes = {
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

const mapDispatchToProps = {
  getPost: getPost,
  deletePost: deletePost,
  like: like,
  unlike: unlike
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

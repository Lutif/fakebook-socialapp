import React, { useEffect, Fragment } from "react";
import { getPostbyId } from "../../actions/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layout/loading";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";
import Comments from "./Comments";
const Post = ({ match, getPostbyId, post: { post, loading } }) => {
  useEffect(() => {
    getPostbyId(match.params.id);
  }, [match, getPostbyId]);
  return (
    <Fragment>
      {post == null ? (
        <Loading />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text} </p>
            </div>
          </div>
          <CreateComment />
          <Comments />
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired,
  getPostbyId: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  getPostbyId: getPostbyId
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

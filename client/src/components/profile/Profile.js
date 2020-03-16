import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import EduExp from "./EduExp";
import { Link } from "react-router-dom";
import Loading from "../layout/loading";

const Profile = ({
  profile: { profile, loading },
  auth: { user },
  match,
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [match, loading, getProfileById]);
  return (
    <Fragment>
      <Fragment>
        <Link to="/profiles" className="btn btn-light">
          Back To Profiles
        </Link>
        {user !== null && user._id === match.params.id ? (
          <Link to="/edit-profile" className="btn btn-light">
            Edit profile
          </Link>
        ) : null}
      </Fragment>
      {profile != null ? (
        <Fragment>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <EduExp profile={profile} />
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
    //Buttons
    //header
    //skillBio
    //repos
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = {
  getProfileById: getProfileById
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

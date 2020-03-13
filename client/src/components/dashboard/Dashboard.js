import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Loader from "../layout/loading";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    <Loader />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile == null ? (
        <Fragment>
          <p>You have to create a profile , please add details</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardAction />
          <Experience experienceList={profile.experience} />
          <Education educationList={profile.education} />
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            Delete Account
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = {
  getCurrentProfile: getCurrentProfile,
  deleteAccount: deleteAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

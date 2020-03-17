import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";

import { Link } from "react-router-dom";
const Profiles = ({ getAllProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <Fragment>
      <h1 class="large text-primary">Developers</h1>
      <p class="lead">
        <i class="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div class="profiles">
        {profiles.map(dev => (
          <div key={dev.key} class="profile bg-light">
            <img class="round-img" src={dev.user.avatar} alt="user" />
            <div>
              <h2>{dev.user.name}</h2>
              <p>{dev.status}</p>
              <p>{dev.location}</p>
              <Link to={`/profile/${dev.user._id}`} class="btn btn-primary">
                View Profile
              </Link>
            </div>

            <ul>
              {dev.skills.map(skill => (
                <li class="text-primary">
                  <i class="fas fa-check"></i> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getAllProfiles: getAllProfiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);

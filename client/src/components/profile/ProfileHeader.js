import React, { Fragment } from "react";
import { Link } from "react-router-dom";
function ProfileHeader({ profile }) {
  return (
    <Fragment>
      <div className="profile-top bg-primary p-2">
        <img className="round-img my-1" src={profile.user.avatar} alt="" />
        <h1 className="large">{profile.user.name}</h1>
        <p className="lead">{profile.user.status}</p>
        <p>{profile.user.location}</p>
        {profile.social != null && (
          <div className="icons my-1">
            <Link
              to={profile.social.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe fa-2x"></i>
            </Link>
            <Link
              to={profile.social.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </Link>
            <Link
              to={profile.social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </Link>
            <Link
              to={profile.social.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </Link>
            <Link
              to={profile.social.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube fa-2x"></i>
            </Link>
            <Link
              to={profile.social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default ProfileHeader;

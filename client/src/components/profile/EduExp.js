import React, { Fragment } from "react";

export default function ProfileAbout({ profile }) {
  return (
    <Fragment>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {profile.experience != null &&
          profile.experience.map((exp, index) => (
            <div key={index}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>Oct 2011 - Current</p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
            </div>
          ))}
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {profile.education != null &&
          profile.education.map((edu, index) => (
            <div>
              <h3>{edu.school}</h3>
              <p>Sep 1993 - June 1999</p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldofstudy}
              </p>
              <p>
                <strong>Description: </strong>Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                ipsam, sapiente suscipit dicta eius velit amet aspernatur
                asperiores modi quidem expedita fugit.
              </p>
            </div>
          ))}
      </div>
    </Fragment>
  );
}

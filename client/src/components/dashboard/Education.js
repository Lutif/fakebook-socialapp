import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";
import { connect } from "react-redux";

const Education = ({ educationList, deleteEducation }) => {
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educationList.map(({ school, degree, from, to, _id }) => (
            <tr key={_id}>
              <td>{school}</td>
              <td className="hide-sm">{degree}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                {to === null || "" ? (
                  "Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEducation(_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  educationList: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};
const mapDispatchToProps = {
  deleteEducation: deleteEducation
};

export default connect(null, mapDispatchToProps)(Education);

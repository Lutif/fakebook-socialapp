import React, { Fragment } from "react";
import loading from "../../img/spinner.gif";

export default function Loading() {
  return (
    <Fragment>
      <img
        src={loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="loading..."
      />
      >
    </Fragment>
  );
}

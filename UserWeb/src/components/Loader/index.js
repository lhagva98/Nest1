import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="PA-XY centerXY"
      style={{ background: "white", zIndex: 999 }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;

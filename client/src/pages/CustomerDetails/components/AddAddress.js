import React from "react";

export default () => {
  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <div className="md-form mt-0">
          <input className="form-control" type="text" placeholder="Address" />
        </div>
      </div>
      <div className="col-12 col-md-3">
        <button type="button" className="btn rounded btn-info">
          Add
        </button>
      </div>
    </div>
  );
};

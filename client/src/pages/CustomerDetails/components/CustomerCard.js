import React from "react";

export default (props) => {
  const { name, img, age, gender } = props;
  return (
    <div className="card text-center">
      <div className="view overlay">
        <img className="card-img-top" src={img} alt={name} />
        <a href="#!">
          <div className="mask rgba-white-slight" />
        </a>
      </div>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text d-inline">Age: {age}</p>
        <p className="card-text d-inline ml-3">Sex: {gender}</p>
      </div>
    </div>
  );
};

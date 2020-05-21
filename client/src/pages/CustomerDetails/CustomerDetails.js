import React from "react";
import { v4 as uuid } from "uuid";
import CustomerCard from "./components/CustomerCard";
import AddAddress from "./components/AddAddress";

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

export default () => {
  const addresses = [
    "103/B, Jamku Niwas, Daulat Nagar, Borivali east - 401203",
    "103/B, Jamku Niwas, Daulat Nagar, Borivali east - 401203",
    "103/B, Jamku Niwas, Daulat Nagar, Borivali east - 401203",
  ];

  const copyAddress = (idx) => {
    copyTextToClipboard(addresses[idx]);
  };

  return (
    <div className="container m-auto">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4 m-auto">
          <CustomerCard
            name="Adarsh Senghani"
            img="https://www.clipartmax.com/png/middle/364-3643767_about-brent-kovacs-user-profile-placeholder.png"
            age="18"
            gender="Male"
          />
        </div>
        <div className="col-12 col-md-8 col-lg-6 mx-auto mt-3 mt-md-0">
          <AddAddress />
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Addresses</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address, idx) => {
                return (
                  <tr className="address-row" key={uuid()}>
                    <td>{address}</td>
                    <td className="copy d-none d-md-table-cell">
                      <button
                        type="button"
                        className="btn  btn-sm rounded	btn-danger m-0 px-3"
                      >
                        <i className="fas fa-trash-alt" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td className="copy d-none d-md-table-cell">
                      <button
                        type="button"
                        onClick={() => copyAddress(idx)}
                        className="btn  btn-sm rounded	btn-primary m-0 px-3"
                      >
                        <i className="far fa-copy" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";

const hero = ({ title }) => {
  return (
    <section className="breadcrumb_area">
      <div
        className="overlay bg-parallax"
        data-stellar-ratio="0.8"
        data-stellar-vertical-offset="0"
        data-background=""
      ></div>
      <div className="container">
        <div className="page-cover text-center">
          <h2 className="page-cover-tittle">{title}</h2>
          <ol className="breadcrumb">
            {/* <li><a href="index.html">Home</a></li> */}
            <li className="homebtn">
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li className="active">{title}</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default hero;

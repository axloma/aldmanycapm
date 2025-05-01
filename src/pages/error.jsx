import React from "react";
import { Link } from "react-router-dom";
import notfound from "../assets/404.jpg";
import avatar from "../assets/ava.jpg";
import StyledHero from "../components/StyledHero";

function error() {
  return (
    <>
      <section className="Error">
        <div className="msg">
          <span className="page">
            {" "}
            <strong> page not found</strong>
          </span>{" "}
          <br />
          <div className="home">
            {" "}
            <Link to="/">
              {" "}
              <i>HOME</i>
            </Link>
          </div>
        </div>
      </section>
      r
    </>
  );
}

export default error;

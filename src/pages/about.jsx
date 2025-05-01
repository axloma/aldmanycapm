import React from "react";
import Services from "../components/services";
import Comments from "../components/comment";
import Aboutus from "../components/aboutus";
import { Link } from "react-router-dom";
const about = () => {
  return (
    <>
      {/* <!--================Breadcrumb Area =================--> */}
      <section className="breadcrumb_area">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset="0"
          data-background=""
        ></div>
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle">About Us</h2>
            <ol className="breadcrumb">
              {/* <li><a href="index.html">Home</a></li> */}
              <li className="homebtn">
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li className="active">About</li>
            </ol>
          </div>
        </div>
      </section>
      {/* <!--================Breadcrumb Area =================-->
        
        <!--================ About History Area  =================--> */}

      {/* <!--================ About History Area  =================-->*/}
      <Aboutus />
      {/*<!--================ Facilities Area  =================--> */}
      <Services />
      {/* COMMENT SECTION  */}
      <Comments />
    </>
  );
};

export default about;

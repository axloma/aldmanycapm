import React from "react";
import { useState } from "react";
import Booking from "../components/booking";
// import FeaturedRooms from "../components/FeaturedRooms";
import RoomsContainer from "../components/RoomsContainer";
// import Spinner from "../components/loading";
import { Link } from "react-router-dom";
// import Cookies from 'js-cookie';
const accomodation = () => {
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
            <h2 className="page-cover-tittle">Accomodation</h2>
            <ol className="breadcrumb">
              {/* <li><a href="index.html">Home</a></li> */}
              <li className="homebtn">
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li className="active">Accomodation</li>
            </ol>
          </div>
        </div>
      </section>
      <RoomsContainer />
      {/* <!--================Breadcrumb Area =================-->
        
        <!--================ Accomodation Area  =================--> */}
      {/* special accomdation */}
      {/* <Rooms rooms={rooms} title={"speacial Accomodation"} desc={"We all live inely fast,"}/> */}
      {/* <FeaturedRooms />  */}
      {/* <!--================ Accomodation Area  =================-->
        <!--================Booking Tabel Area =================--> */}

      {/* <Booking /> */}
      {/* <!--================Booking Tabel Area  =================-->
        <!--================ Accomodation Area  =================--> */}
      {/* //TODO:  insert rooms */}
      {/* <Rooms rooms={rooms} title={"Normal Accomodation"} desc={"We all live in an age that belongs to the young at heart. Life that is becoming extremely fast,"}/> */}
      {/* <!--================ Accomodation Area  =================--> */}
    </>
  );
};

export default accomodation;

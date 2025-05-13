import React from "react";

// import FeaturedRooms from "../components/FeaturedRooms";
import RoomsContainer from "../components/RoomsContainer";
import Hero from "../components/hero";

// import Spinner from "../components/loading";

const accomodation = () => {
  return (
    <>
      {/* <!--================Breadcrumb Area =================--> */}
      <Hero title={"Accomodation"} />

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

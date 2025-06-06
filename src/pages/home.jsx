import React, { useState } from "react";
// import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import Services from "../components/services";
import FeaturedRooms from "../components/FeaturedRooms";
// import Booking from '../components/booking'
import Aboutus from "../components/aboutus";
import Posts from "../components/posts";
import Comments from "../components/comment";
import Room from "../components/Room";
import RoomsList from "../components/RoomsList";
import RoomsContainer from "../components/RoomsContainer";

// import Nave from '../components/nave';
// import Rooms from "../rooms";
const home = () => {
  // const [rooms, setRooms] = useState([
  //   {
  //     name: "Double Deluxe Room",
  //     price: 250,
  //     images: "./image/room1.jpg",
  //     slug: "name",
  //   },
  //   { name: "Single Deluxe Room", price: 200, images: "image/room2.jpg" },
  //   { name: "honey moon sweet", price: 750, images: "image/room3.jpg" },
  //   { name: "echonomey double", price: 250, images: "image/room4.jpg" },
  // ]);

  return (
    <>
      {/* <!--================Header Area =================-->       
        <!--================Banner Area =================--> */}
      <section className="banner_area">
        <div className="booking_table d_flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset="0"
            data-background=""
          ></div>
          <div className="container">
            <div className="banner_content text-center">
              <h6>Away from monotonous life</h6>
              <h2>Relax Your Mind</h2>
              <p>
                If you are looking at blank cassettes on the web, you may be
                very confused at the
                <br /> difference in price. You may see some for as low as $.17
                each.
              </p>
              <a href="#" className="btn theme_btn button_hover">
                Get Started
              </a>
            </div>
          </div>
        </div>
        {/* <Booking/> */}
      </section>
      {/* <!--================Banner Area =================-->
        
        <!--================ Accomodation Area  =================--> */}
      {/* <Room room={rooms} title={"Hotel Accomodation"} /> */}
      {/* <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">{"ALL ROOMS "}</h2> */}
      {/* <p>{props.desc}</p> */}
      {/* </div>
          <div className="row accomodation_two"> */}
      {/* {rooms.map((room, index) => (
              <Room key={index} room={room} />
            ))} */}
      {/* <RoomsContainer /> */}
      <FeaturedRooms />
      {/* </div>
        </div>
      </section> */}
      {/* <RoomsList rooms={rooms} /> */}
      {/* <!--================ Accomodation Area  =================-->
        
        <!--================ Facilities Area  =================--> */}
      <Services />
      {/* <!--================ Facilities Area  =================--> */}
      {/* Featured room */}
      {/* <FeaturedRooms/> */}
      {/* <!--================ About History Area  =================--> */}
      <Aboutus />
      {/* <!--================ About History Area  =================-->
        <!--================ Testimonial Area  =================--> */}

      {/* <!--================ Testimonial Area  =================-->       
        <!--================ Latest Blog Area  =================--> */}
      <Posts />
    </>
  );
};

export default home;

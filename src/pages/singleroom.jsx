import React, { Component, useState } from "react";
import defaultBcg from "../images/room-1.jpeg";
// import Hero from "../components/Hero";
// import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context/context";
import { Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import StyledHero from "../components/StyledHero";
import Booking from "../components/booking";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Cursor } from "react-bootstrap-icons";
// import { baseUrl } from "..../config";

export default function SingleRoom() {
  // constructor(props) {
  //   super(props);
  //   console.log(this.props);
  //   console.log(this.params)
  //   this.state = {
  //     // slug: slug,
  //     defaultBcg: defaultBcg
  //   };
  // }
  const context = useContext(RoomContext);

  // componentDidMount() {
  //   console.log(this.props);
  // }

  let { slug } = useParams();
  slug = slug.replaceAll("-", " ");
  const { getRoom } = context;
  const room = getRoom(slug);
  console.log(room);

  if (!room) {
    return (
      <div className="error">
        <h3> no such room could be found...</h3>
        <Link to="/accomodation" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;
  const [main, ...defaultImages] = images;
  console.log(defaultImages);
  const settings = {
    // customPaging: function(i) {
    //   return (
    //     <a className="xm">
    //       <img src={`${defaultImages[i ]} `} />
    //     </a>
    //   );
    // },
    className: "center",
    dots: true,
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScorll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    // vertical: true,
    // verticalSwiping: true,
    lazyLoad: true,
    focusOnSelect: true,
    Cursor: "pointer",
  };
  const [defaultimg, setDefaultImg] = useState(
    `https:` + images[0] || this.state.defaultBcg
  );

  const setimg = (img) => {
    setDefaultImg(`https:${img}`);
  };
  return (
    <>
      <StyledHero img={defaultimg}>
        {/* <Banner title={`${name} room`}> */}
        <Link to="/accomodation" className="btn-primary">
          back to rooms
        </Link>
        {/* </Banner> */}
      </StyledHero>
      <section className="single-room ">
        <div className="single-room-images ">
          <Slider {...settings}>
            {defaultImages.map((item, index) => (
              <img
                key={index}
                src={`https:` + item}
                alt={name}
                onClick={() => setimg(item)}
              />
            ))}
          </Slider>
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info infox">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras </h6>
        <ul className="extras">
          {extras != undefined || ""
            ? extras.map((item, index) => <li key={index}>- {item}</li>)
            : ""}
        </ul>
        <Booking room={room} />
      </section>
    </>
  );
}

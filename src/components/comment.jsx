import React from "react";
import { nanoid } from "nanoid";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const comment = () => {
  const [comments, setComments] = useState([
    {
      name: "cA",
      comment: "As conscious traveling Paupers we must always ",
      cusimg: "/image/testtimonial-1.jpg",
    },
    {
      name: "cB",
      comment: "As conscious traveling Paupers we must always ",
      cusimg: "./src/assets/image/testtimonial-1.jpg",
    },
    {
      name: "cc",
      comment:
        "Paupers we must always Paupers we must alwaysPaupers we must alwaysPaupers we must always ",
      cusimg: "image/testtimonial-1.jpg",
    },
  ]);
  const settings = {
    className: "center",
    dots: true,
    // fade: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScorll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
  };

  return (
    <section className="testimonial_area section_gap">
      <div className="container comment">
        <div className="section_title text-center">
          <h2 className="title_color">Testimonial from our Clients</h2>
          <p>
            The French Revolution constituted for the conscience of the dominant
            aristocratic class a fall from{" "}
          </p>
        </div>
        <div className="testimonial_slider comments">
          {/* <div className="testimonial_slider owl-carousel"> */}
          {/* TODO: generate automatic comment */}

          <Slider {...settings}>
            {comments.map((comment, index) => (
              <div className="media testimonial_item comment" key={nanoid()}>
                <img className="rounded-circle" src={comment.cusimg} alt="" />
                <div className="media-body ">
                  <p>{comment.comment}</p>
                  <a href="#">
                    <h4 className="sec_h4">{comment.name}</h4>
                  </a>
                  <div className="star">
                    <a href="#">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-star-half-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default comment;

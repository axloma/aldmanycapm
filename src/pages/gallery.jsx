import React from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context/context";
import { useContext } from "react";
import { nanoid } from "nanoid";
const gallery = () => {
  const { gallery } = useContext(RoomContext);
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
            <h2 className="page-cover-tittle">Gallery</h2>
            <ol className="breadcrumb">
              {/* <li><a href="index.html">Home</a></li> */}
              <li className="homebtn">
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li className="active">Gallery</li>
            </ol>
          </div>
        </div>
      </section>
      {/* <!--================Breadcrumb Area =================-->
        
        <!--================Breadcrumb Area =================--> */}
      <section className="gallery_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Aldamany Camp Gallery</h2>
            <p>Who are in extremely love with eco friendly system.</p>
          </div>
          <div className="row imageGallery1" id="gallery">
            {gallery.map((img) => (
              <div className="col-md-4 gallery_item" key={nanoid()}>
                <div className="gallery_img">
                  <img src={`https:${img}`} alt="" />
                  <div className="hover">
                    <a className="light" href="image/gallery/01.jpg">
                      <i className="fa fa-expand"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <!--================Breadcrumb Area =================--> */}
    </>
  );
};

export default gallery;

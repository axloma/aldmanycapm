import React from "react";
import { useState } from "react";
import defaultImg from "../images/defaultBcg.jpeg";
import {
  FaBeer,
  FaHiking,
  FaSwimmer,
  FaShuttleVan,
  FaWifi,
  FaCar,
  FaShoppingCart,
  FaBasketballBall,
  FaCat,
} from "react-icons/fa";

import { useContext } from "react";
import { nanoid } from "nanoid";
import { RoomContext } from "../context/context";
const items = {
  FaBeer: FaBeer,
  FaHiking: FaHiking,
  FaSwimmer: FaSwimmer,
  FaShuttleVan: FaShuttleVan,
  FaWifi: FaWifi,
  FaCar: FaCar,
  FaShoppingCart: FaShoppingCart,
  FaBasketballBall: FaBasketballBall,
  FaCat: FaCat,
};

const services = () => {
  let { service } = useContext(RoomContext);

  service = service.map((el) =>
    el.icon ? { ...el, icon: String(el.icon[0].replace(/^"(.*)"$/, "$1")) } : el
  );

  return (
    <>
      {/* <!--================ Facilities Area  =================--> */}
      <section className="facilities_area section_gap" id="services">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset="0"
          data-background=""
        ></div>
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_w">ALDAMANY CAMP Facilities</h2>
            <p>Who are in extremely love with eco friendly system.</p>
          </div>

          <div className="row mb_30">
            {/* TODO: autogenerate facility  */}

            {service.map(({ name, img, desc, icon }) => (
              <div className="col-lg-4 col-md-6" key={nanoid()}>
                <div className="facilities_item">
                  {/* <h4 className="sec_h4"><i className={fac.iClass}></i>{fac.name}</h4> */}
                  <h4 className="sec_h4">
                    <span className="icons">{items[icon]()}</span> {name}
                  </h4>
                  <img
                    src={`https:${img.fields.file.url}` || defaultImg}
                    alt=""
                    className="img-fluid"
                  />
                  <p>{desc}.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* {/* <!--================ Facilities Area  =================--> */}
    </>
  );
};

export default services;

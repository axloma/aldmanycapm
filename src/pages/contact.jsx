"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { RoomContext } from "../context/context";
import { useRef } from "react";
// require("dotenv").config();
// import { Email } from "./email";
import emailjs from "@emailjs/browser";
import Hero from "../components/hero";
const contact = () => {
  const { contact } = useContext(RoomContext);
  const [success, SetSuccess] = useState(false);
  const form = useRef();

  let country = "";
  let city = "";
  let phone = "";
  let Businesshours = "";
  let supportemail = "";

  if (contact != "" || undefined) {
    country = contact[0].country;
    city = contact[0].city;
    phone = contact[0].phone;
    supportemail = contact[0].supportemail;
    Businesshours = `from ${contact[0].businesshours} to ${contact[0].businesshoursto} `;
  }
  const email = async (e) => {
    e.preventDefault();
    // const data = new FormData(document.getElementById("contactForm"));
    // const name = data.get("name");
    // const email = data.get("email");
    // const subject = data.get("subject");
    // const msg = data.get("message");
    // console.log(name, email, subject, msg);

    emailjs
      .sendForm(
        process.env.REACT_APP_ServiceID,
        process.env.REACT_APP_TemplateID,
        form.current,
        {
          publicKey: process.env.REACT_APP_PUBLICKEY,
        }
      )
      .then(
        () => {
          SetSuccess((prev) => !prev);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    // await fetch("/api/email", { method: "POST" });
  };
  const close = () => {
    SetSuccess((prev) => !prev);
  };
  return (
    <>
      <Hero title={"Contact Us"} />
      {/* <!--================Breadcrumb Area =================-->
        <!--================Contact Area =================--> */}

      <section className="contact_area section_gap">
        <div className="container">
          {/* <div id="mapBox"  className="mapBox" 
                    data-lat="40.701083" 
                    data-lon="-74.1522848" 
                    data-zoom="13" 
                    data-info="PO Box CT16122 Collins Street West, Victoria 8007, Australia."
                    data-mlat="40.701083"
                    data-mlon="-74.1522848">
                </div> */}
          <div style={{ width: "100%" }}>
            <iframe
              width="100%"
              height="600"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(aldamanyCamp)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/collections/personal-trackers/">
                Personal GPS
              </a>
            </iframe>
          </div>

          <div className="row">
            <div
              className="col-md-3"
              style={{
                boxShadow: "5px 10px 3px 1px black",
                fontSize: "1rem",
              }}
            >
              <div className="contact_info">
                <div className="info_item">
                  <i className="lnr lnr-home"></i>
                  <h6>{country ? country : "country"}</h6>
                  <p>{city || "city"}</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-phone-handset"></i>
                  <h6>
                    <a href="#">{phone || "phone"}</a>
                  </h6>
                  <p>{Businesshours || "Working Hours"}"</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-envelope"></i>
                  <h6>
                    <a href="#">{supportemail || "supportemail"}</a>
                  </h6>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              {/* email form/////////////////////////////////////////////////////  */}
              {!success && (
                <form
                  className="row contact_form"
                  // action="contact_process.php"
                  // action={email}
                  id="contactForm"
                  ref={form}
                  onSubmit={email}
                  noValidate="novalidate"
                  style={{
                    boxShadow: "5px 10px 8px 10px black",
                    fontSize: "1rem",
                  }}
                >
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="user_name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="user_email"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="Enter Subject"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        rows="1"
                        placeholder="Enter Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      value="submit"
                      className="btn theme_btn button_hover"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <!--================Contact Area =================-->
        
       
       
       <!--================Contact Success and Error message Area =================--> */}
      {success && (
        <div id="success" className=" " role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={close}
                >
                  <i className="fa fa-close"></i>
                </button>
                <h2 style={{ backgroundColor: "green" }}>Thank you</h2>
                <p>Your message is successfully sent...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Modals error --> */}

      <div id="error" className="modal modal-message fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-close"></i>
              </button>
              <h2>Sorry !</h2>
              <p> Something went wrong </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================End Contact Success and Error message Area =================-->
        
        
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
    </>
  );
};

export default contact;

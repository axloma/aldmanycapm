import React from "react";

const footer = () => {
  return (
    <>
      {/*  <!--================ start footer Area  =================-->	 */}
      <footer className="footer-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-3  col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6 className="footer_title">About Agency</h6>
                <p>
                  The world has become so fast paced that people don’t want to
                  stand by reading a page of information, they would much rather
                  look at a presentation and understand the message. It has come
                  to a point{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6 className="footer_title">Navigation Links</h6>
                <div className="row">
                  <div className="col-4">
                    <ul className="list_style">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Feature</a>
                      </li>
                      <li>
                        <a href="#services">Services</a>
                      </li>
                      <li>
                        <a href="#">Portfolio</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-4">
                    <ul className="list_style">
                      <li>
                        <a href="#">Team</a>
                      </li>
                      <li>
                        <a href="#">Pricing</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6 className="footer_title">Newsletter</h6>
                <p>
                  For business professionals caught between high OEM price and
                  mediocre print and graphic output,{" "}
                </p>
                <div id="mc_embed_signup">
                  <form
                    target="_blank"
                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                    method="get"
                    className="subscribe_form relative"
                  >
                    <div className="input-group d-flex flex-row">
                      <input
                        name="EMAIL"
                        placeholder="Email Address"
                        required=""
                        type="email"
                      />
                      <button className="btn sub-btn">
                        <span className="lnr lnr-location"></span>
                      </button>
                    </div>
                    <div className="mt-10 info"></div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget instafeed">
                <h6 className="footer_title">InstaFeed</h6>
                <ul className="list_style instafeed d-flex flex-wrap">
                  <li>
                    <img src="image/instagram/Image-01.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-02.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-03.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-04.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-05.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-06.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-07.jpg" alt="" />
                  </li>
                  <li>
                    <img src="image/instagram/Image-08.jpg" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border_line"></div>
          <div className="row footer-bottom d-flex justify-content-between align-items-center">
            <p className="col-lg-8 col-sm-12 footer-text m-0">
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script> All
              rights reserved{" "}
              <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
              <a href="" target="_blank">
                {" "}
                "Aldamany Camp"
              </a>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --*/}
            </p>
            <div className="col-lg-4 col-sm-12 footer-social">
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa fa-dribbble"></i>
              </a>
              <a href="#">
                <i className="fa fa-behance"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* <!--================ End footer Area  =================-->*/}
    </>
  );
};

export default footer;

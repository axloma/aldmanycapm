import React from "react";
import Services from "../components/services";
import Comments from "../components/comment";
import Aboutus from "../components/aboutus";
import Hero from "../components/hero";

const about = () => {
  return (
    <>
      {/* <!--================Breadcrumb Area =================--> */}
      <Hero title={"About Us"} />

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
